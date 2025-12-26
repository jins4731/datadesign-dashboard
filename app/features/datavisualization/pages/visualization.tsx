import React, { useEffect, useState } from "react";
import ItemGroup from '../items/components/common/itemGroup';
import {Action, Actions, BorderNode, Layout, Model, TabSetNode, type IJsonModel, type ITabSetRenderValues} from 'flexlayout-react';
import "flexlayout-react/style/light.css";  
import "./visualization.css";
import BarChart from "../items/barChart";
import { Menu } from 'lucide-react';
import { Button } from "~/common/components/ui/button";
import { useOutletContext } from "react-router";
import type { TableData, TableNode } from "~/root";
import { useLayoutItems } from "../items/hook/useLayoutItems";
import type { ChartType } from "~/engine/types/chart-config.types";
import { Dialog, DialogContent } from "~/common/components/ui/dialog";
import ItemOptionDialog from "../items/components/common/itemOptionDialog";

export type ActiveOption = {
  id: string;
  componentType: string;
};

export type getItemConfigFn = <T=any> (
  id: string,
    key?: string
  ) => T | Record<string, any> | undefined ;

export type UpdateItemConfigFn = <T = any>(
  id: string,
  key: string,
  value: T
) => void;

export type updateItemConfigBatchFn = (
  id: string,
  nextConfig: Record<string, any>
) => void;

const Visualization = () => {
  const {
    model,
    addItem,
    updateItemConfig,
    updateItemConfigBatch,
    removeItem,
    getItemConfig
  } = useLayoutItems();
  const {dataTables} = useOutletContext<{
    dataTables: TableData[];
  }>();
  
  const [tables, setTables] = useState<TableNode[]>(dataTables.map((dataTable, i) => {
    const isSelected = i === 0;
    
    return {
      ...dataTable.table,
      isSelected
    }
  }));
  const [dialogState, setDialogState] = useState<ActiveOption | null>(null);

  const selectedTableId = tables.find((table) => table.isSelected)?.id;
  const selectedDataTable = dataTables.find((dataTable) => dataTable.table.id === selectedTableId);

  const selectTable = (id: string) => {
    const newTables = tables.map((table) => {
      if (table.id === id) {
        return {
          ...table,
          isSelected: true
        }
      }

      return {
        ...table,
        isSelected: false
      }
    });
    setTables(newTables);
  }

  const factory = (node: any) => {
    const id = node.getId(); 
    const component = node.getComponent();
    const config = getItemConfig(id)

    const ItemComponent = renderItem(component);
    if (!ItemComponent) return null;

    return (
      <ItemComponent
        id={id}   // ★ 전달
        selectedDataTable={selectedDataTable}
        config={config}
        openOption={setDialogState}
      />
    )
  }

  const renderItem = (component: ChartType) => {
    console.log('component v', component);
    if (component === 'bar') {
      return BarChart;
    }
  }

  const onAction = (action: Action | undefined) => {
    if (!action) return;
    if (action.type === Actions.DELETE_TAB) {
      const itemId = action.data.node

      if (!itemId) return;
      removeItem(itemId);

      return undefined;
    }

    return action;
  }

  const onRenderTabSet = (node: (TabSetNode | BorderNode), renderValues: ITabSetRenderValues) => {
    const selectedNode = node.getSelectedNode() as any;
    if (!selectedNode) return;

    const component = selectedNode.getComponent();
    const id = selectedNode.getId();
    const config = selectedNode.getConfig?.() || {};

  
    const menuButton = (
      <Button
        variant="outline"
        onClick={() => {
          // setOpen(true);
        }}
      >
        <Menu/>
      </Button>
    );
    renderValues.buttons.push(menuButton);
  }

  return (
      <div className="flex flex-col h-screen py-2 px-2">
        <div className="h-[10%]">
          <ItemGroup 
            tables={tables}
            selectTable={selectTable}
            addItem={addItem}
          />
        </div>

        <div className="h-[90%] border-2">
          <Layout
            model={model}
            factory={factory}
            onRenderTabSet={onRenderTabSet}
            onAction={onAction}
          />
        </div>

        <Dialog
          open={!!dialogState}
          onOpenChange={(open) => {
            if (!open) setDialogState(null);
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
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
      </div>
  )
}

export default Visualization;
