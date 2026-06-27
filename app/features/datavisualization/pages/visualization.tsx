import React, { useContext, useState } from "react";
import { requireUser } from "~/server/auth.server";
import { saveDashboard, getDashboard } from "~/server/dashboard.server";
import type { Route } from "./+types/visualization";
import type { IJsonModel } from "flexlayout-react";
import { Action, Actions, BorderNode, Layout, Model, TabSetNode, type ITabSetRenderValues } from 'flexlayout-react';
import "flexlayout-react/style/dark.css";
import "./visualization.css";
import BarChart from "../items/components/barChart";
import LineChart from "../items/components/lineChart";
import PieChart from "../items/components/pieChart";
import ScatterChart from "../items/components/scatterChart";
import ItemGroup from '../items/components/common/itemGroup';
import { Download, Save } from 'lucide-react';
import { Button } from "~/common/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/common/components/ui/dialog";
import { Input } from "~/common/components/ui/input";
import { useFetcher, useLoaderData, useOutletContext } from "react-router";
import type { TableData, TableNode } from "~/root";
import { useLayoutItems, type ChartConfigMap } from "../items/hook/useLayoutItems";
import type { ChartType } from "~/engine/types/chart-config.types";
import ItemOptionDialog from "../items/components/common/itemOptionDialog";
import { ChartRegistryContext } from "~/features/datavisualization/context/ChartRegistryContext";

export type ActiveOption = {
  id: string;
  componentType: string;
};

export type getItemConfigFn = <T=any>(id: string, key?: string) => T | Record<string, any> | undefined;
export type UpdateItemConfigFn = <T = any>(id: string, key: string, value: T) => void;
export type updateItemConfigBatchFn = (id: string, nextConfig: Record<string, any>) => void;

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireUser(request);

  const url = new URL(request.url);
  const dashboardId = url.searchParams.get('dashboardId');

  let dashboard = null;
  if (dashboardId) {
    dashboard = await getDashboard(dashboardId, user.id);
  }

  return { dashboard };
}

export async function action({ request }: Route.ActionArgs) {
  const { user } = await requireUser(request);
  const formData = await request.formData();

  const name = formData.get('name') as string;
  const layoutJson = JSON.parse(formData.get('layoutJson') as string);
  const chartsJson = JSON.parse(formData.get('chartsJson') as string);

  const id = await saveDashboard({ userId: user.id, name, layoutJson, chartsJson });
  return { success: true, id };
}

const Visualization = () => {
  const { dashboard } = useLoaderData<typeof loader>();
  const { dataTables: contextDataTables } = useOutletContext<{ dataTables: TableData[] }>();
  const registry = useContext(ChartRegistryContext);

  // 저장된 대시보드가 있으면 그 데이터를 사용, 없으면 업로드된 데이터 사용
  const dataTables: TableData[] = dashboard
    ? (dashboard.chartsJson as unknown as { dataTables: TableData[] }).dataTables
    : contextDataTables;

  const initial = dashboard ? {
    layoutJson: dashboard.layoutJson as unknown as IJsonModel,
    chartConfigs: (dashboard.chartsJson as unknown as { chartConfigs: ChartConfigMap }).chartConfigs,
  } : undefined;

  const { model, chartConfigs, addItem, updateItemConfig, updateItemConfigBatch, removeItem, getItemConfig } = useLayoutItems(initial);

  const [tables, setTables] = useState<TableNode[]>(
    dataTables.map((dt, i) => ({ ...dt.table, isSelected: i === 0 }))
  );
  const [dialogState, setDialogState] = useState<ActiveOption | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState('새 대시보드');

  const saveFetcher = useFetcher<typeof action>();

  const selectedTableId = tables.find((t) => t.isSelected)?.id;
  const selectedDataTable = dataTables.find((dt) => dt.table.id === selectedTableId);

  const selectTable = (id: string) => {
    setTables((prev) => prev.map((t) => ({ ...t, isSelected: t.id === id })));
  };

  const factory = (node: any) => {
    const id = node.getId();
    const component = node.getComponent();
    const config = getItemConfig(id);
    const ItemComponent = renderItem(component);
    if (!ItemComponent) return null;

    return (
      <ItemComponent
        id={id}
        selectedDataTable={selectedDataTable}
        config={config}
        openOption={setDialogState}
      />
    );
  };

  const renderItem = (component: ChartType) => {
    if (component === 'bar') return BarChart;
    if (component === 'line') return LineChart;
    if (component === 'scatter') return ScatterChart;
    if (component === 'pie') return PieChart;
  };

  const onAction = (action: Action | undefined) => {
    if (!action) return;
    if (action.type === Actions.DELETE_TAB) {
      const itemId = action.data.node;
      if (itemId) removeItem(itemId);
      return undefined;
    }
    return action;
  };

  const onRenderTabSet = (node: TabSetNode | BorderNode, renderValues: ITabSetRenderValues) => {
    const selectedNode = node.getSelectedNode() as any;
    if (!selectedNode) return;

    const id = selectedNode.getId();

    const onDownload = () => {
      const chart = registry?.get(id);
      if (!chart) return;
      chart.resize();
      const dataUrl = chart.getDataURL({ type: "png", pixelRatio: 2, backgroundColor: "#transparent" });
      if (!dataUrl) return;
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${id}.png`;
      a.click();
    };

    renderValues.buttons.push(
      <Button key="download" variant="default" size="icon" className="h-7 w-7" onClick={onDownload}>
        <Download className="h-4 w-4" />
      </Button>
    );
  };

  const handleSave = () => {
    saveFetcher.submit(
      {
        name: saveName,
        layoutJson: JSON.stringify(model.toJson()),
        chartsJson: JSON.stringify({ chartConfigs, dataTables }),
      },
      { method: 'post' }
    );
    setShowSaveDialog(false);
  };

  return (
    <div className="flex h-full flex-col gap-4 bg-muted/30">
      <div className="shrink-0 flex items-center justify-between rounded-xl border bg-background px-4 py-2.5 shadow-sm">
        <ItemGroup tables={tables} selectTable={selectTable} addItem={addItem} />
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs"
          onClick={() => setShowSaveDialog(true)}
        >
          <Save className="h-3.5 w-3.5" />
          저장
        </Button>
      </div>

      <div className="flex-1 rounded-xl border bg-background shadow-sm overflow-hidden">
        <Layout
          model={model}
          factory={factory}
          onRenderTabSet={onRenderTabSet}
          onAction={onAction}
        />
      </div>

      {/* 차트 옵션 다이얼로그 */}
      <Dialog open={!!dialogState} onOpenChange={(open) => { if (!open) setDialogState(null); }}>
        <DialogContent className="sm:max-w-[480px] rounded-xl shadow-lg">
          {dialogState && (
            <ItemOptionDialog
              close={() => setDialogState(null)}
              activeOption={dialogState}
              getItemConfig={getItemConfig}
              updateItemConfigBatch={updateItemConfigBatch}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 저장 다이얼로그 */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-[360px] rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle>대시보드 저장</DialogTitle>
          </DialogHeader>
          <Input
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="대시보드 이름"
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowSaveDialog(false)}>취소</Button>
            <Button onClick={handleSave} disabled={!saveName.trim()}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Visualization;
