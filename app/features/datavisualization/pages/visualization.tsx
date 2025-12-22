import React, { useEffect, useState } from "react";
import ItemGroup from '../items/components/common/itemGroup';
import {BorderNode, Layout, Model, TabSetNode, type IJsonModel, type ITabSetRenderValues} from 'flexlayout-react';
import "flexlayout-react/style/light.css";  
import "./visualization.css";
import BarChart from "../items/barChart";
import { Menu } from 'lucide-react';
import { Button } from "~/common/components/ui/button";
import { createLayoutJson, json2 } from "../items/utils/layoutJson";
import { Form, useFetcher, useOutletContext } from "react-router";
import type { TableData, TableNode } from "~/root";
import { useLayoutItems } from "../items/hook/useLayoutItems";
import type { ChartType } from "~/engine/types/chart-config.types";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
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
  const {items, addItem, updateItemConfig, updateItemConfigBatch, getItemConfig} = useLayoutItems();
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
  console.log('dataTables in visualization', dataTables);
  console.log('tables', tables);
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
  const [model, setModel] = useState(() => Model.fromJson(createLayoutJson(items)));
  const [open, setOpen] = useState(false);
  const [activeOption, setActiveOption] = useState<ActiveOption | null>(null);
 
  useEffect(() => {
    setModel(Model.fromJson(createLayoutJson(items)));
  }, [items]);

  const factory = (node: any) => {
    const component = node.getComponent();
    const config = node.getConfig?.() || {};
    console.log('config', config);
    const nodeId = node.getId(); 

    const ItemComponent = renderItem(component);
    if (!ItemComponent) return null;

    return (
      <ItemComponent
        nodeId={nodeId}   // ★ 전달
        selectedDataTable={selectedDataTable}
        config={config}
        setOpen={setOpen}
        setActiveOption={setActiveOption}
      />
    )
  }

  const renderItem = (component: ChartType) => {
    if (component === 'bar') {
      return BarChart;
    }
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
          setOpen(true);
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
          />
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <ItemOptionDialog
              setOpen={setOpen}
              activeOption={activeOption}
              getItemConfig={getItemConfig}
              updateItemConfigBatch={updateItemConfigBatch}
            />              
          </DialogContent>
        </Dialog>
      </div>
  )
}

export default Visualization;
