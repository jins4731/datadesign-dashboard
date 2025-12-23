import { Actions, DockLocation, Model, type IJsonModel, type IJsonTabNode } from "flexlayout-react";
import { useEffect, useRef, useState } from "react";
import { type ChartType } from "~/engine/types/chart-config.types";
import { getNextIndexFromLayout } from "../utils/layoutJson";
import { BarChartOptions } from "~/engine/charts/bar.config";
import { getOptions } from "~/engine/utils/setOptions";

export type ChartConfigMap = Record<string, Record<string, any>>;

function isTabNode(node: any): node is IJsonTabNode {
  return node?.type === "tab";
}

export function useLayoutItems() {
  // const [items, setItems] = useState<IJsonModel["layout"]["children"]>([]);
  const [chartConfigs, setChartConfigs] = useState<ChartConfigMap>({});
  // const [layout, setLayout] = useState<IJsonModel['layout']>({
  //   type: 'row',
  //   children: []
  // });
  const [model, setModel] = useState<Model>(() =>
    Model.fromJson({
      global: {},
      borders: [],
      layout: {
        type: "row",
        children: []
      }
    })
  );

  const addItem = (type: ChartType) => {    
    // setItems(prev => {
    //   // const config = getOptions(type);
    //   return [
    //     ...prev,
    //     {
    //       type: "tabset",
    //       weight: 50,
    //       children: [
    //         {
    //           type: "tab",
    //           id,
    //           name: `${type.toUpperCase()} Chart ${next}`,
    //           component: type,
    //         }
    //       ]
    //     }
    //   ];
    // });

    // setLayout((prev) => ({
    //   ...prev,
    //   children: [
    //     ...(prev.children ?? []),
    //     {
    //       type: "tabset",
    //       weight: 50,
    //       children: [{
    //         type: "tab",
    //         id,
    //         name: `${type.toUpperCase()} Chart ${next}`,
    //         component: type
    //       }]
    //     }
    //   ]
    // }));
    const json = model.toJson();
    const layout = json.layout as any;
    const next = getNextIndexFromLayout(layout, type);
    const id = `item-${next}`;

    layout.children = layout.children ?? [];
    layout.children.push({
      type: "tabset",
      weight: 50,
      children: [
        {
          type: "tab",
          id,
          name: `${type.toUpperCase()} Chart ${next}`,
          component: type
        },
      ],
    });

    const newModel = Model.fromJson({ ...json, layout });

    setModel(newModel);
    setChartConfigs((cfg) => ({
      ...cfg,
      [id]: getOptions(type)
    }));
  };

  const removeItem = (id: string) => {
    // const removeTab = (node: any): any | null => {
    //   if (!node) return null;

    //   if (node.type === "tab") {
    //     return node.id === id ? null : node;
    //   }

    //   if (node.children) {
    //     const children = node.children
    //       .map(removeTab)
    //       .filter(Boolean);

    //     if (children.length === 0) return null;

    //     return { ...node, children };
    //   }

    //   return node;
    // };

    // setLayout((prev) => {
    //   const cleanedChildren =
    //     prev.children
    //       ?.map(removeTab)
    //       .filter(Boolean) ?? [];

    //   return {
    //     ...prev,
    //     children: cleanedChildren
    //   };
    // });
    // setItems((prev) =>
    //   prev
    //     .map((item) => {
    //       if (!item.children) return item;

    //       const children = item.children.filter(ch => ch.id !== id);
    //       return { ...item, children };
    //     })
    //     .filter(item => item.children && item.children.length > 0)
    // );

    // modelRef.current?.doAction(
    //   Actions.deleteTab(id)
    // );
    const json = model.toJson();
    const newModel = Model.fromJson(json);

    newModel.doAction(Actions.deleteTab(id));

    setModel(newModel);

    setChartConfigs((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const updateItemConfig = <T = any>(
    id: string,
    key: string,
    value: T
  ) => {
    setChartConfigs((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? {}),
        [key]: value
      }
    }));
    // setItems(prev =>
    //   prev.map(item => {
    //     if (item.type !== "tabset" || !item.children) return item;

    //     const updatedChildren = item.children.map((child) => {
    //        if (!isTabNode(child) || child.id !== id) return child;

    //       return {
    //         ...child,
    //         config: {
    //           ...(child.config ?? {}),
    //           [key]: value
    //         }
    //       };
    //     });

    //     return updatedChildren === item.children
    //       ? item
    //       : { ...item, children: updatedChildren };
    //   })
    // );
  };

  const updateItemConfigBatch = (
    id: string,
    nextConfig: Record<string, any>
  ) => {
    // setItems(prev =>
    //   prev.map(item => {
    //     if (item.type !== "tabset" || !item.children) return item;

    //     const updatedChildren = item.children.map(child => {
    //       if (!isTabNode(child) || child.id !== id) return child;

    //       return {
    //         ...child,
    //         config: {
    //           ...(child.config ?? {}),
    //           ...nextConfig
    //         }
    //       };
    //     });

    //     return updatedChildren === item.children
    //       ? item
    //       : { ...item, children: updatedChildren };
    //   })
    // );
    setChartConfigs((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? {}),
        ...nextConfig
      }
    }))
  };

  const getItemConfig = <T = any>(
    id: string,
    key?: string
  ): T | Record<string, any> | undefined => {
    // for (const item of items) {
    //   if (item.type !== "tabset" || !item.children) continue;

    //   for (const child of item.children) {
    //     if (!isTabNode(child) || child.id !== id) continue;

    //     const config = child.config ?? {};

    //     if (key) {
    //       return config[key] as T;
    //     }

    //     return config;
    //   }
    // }

    // return undefined;
    const config = chartConfigs[id];
    if (!config) return undefined;

    return key ? (config[key] as T) : config;
  };

  // const syncLayoutFromModel  = (
  //   layout: IJsonModel["layout"]
  // ) => {
  //   setLayout(layout);
  // };

  return { 
    model,
    addItem, 
    removeItem, 
    updateItemConfig, 
    updateItemConfigBatch, 
    getItemConfig
  };
}
