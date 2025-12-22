import type { IJsonModel, IJsonTabNode } from "flexlayout-react";
import { useState } from "react";
import type { ChartType } from "~/engine/types/chart-config.types";
import { getNextIndexByType } from "../utils/layoutJson";
import { BarChartOptions } from "~/engine/charts/bar.config";
import { getOptions } from "~/engine/utils/setOptions";

function isTabNode(node: any): node is IJsonTabNode {
  return node?.type === "tab";
}

export function useLayoutItems() {
  const [items, setItems] = useState<IJsonModel["layout"]["children"]>([]);

  const addItem = (type: ChartType) => {
    setItems(prev => {
      const {next, totalCount} = getNextIndexByType(prev, type);
      const config = getOptions(type);

      return [
        ...prev,
        {
          type: "tabset",
          weight: 50,
          children: [
            {
              type: "tab",
              id: `item-${totalCount}`,
              className: `item-${totalCount}`,
              name: `${type.toUpperCase()} Chart ${next}`,
              component: `${type}`,
              config: BarChartOptions
            }
          ]
        }
      ];
    });
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateItemConfig = <T = any>(
    id: string,
    key: string,
    value: T
  ) => {
    setItems(prev =>
      prev.map(item => {
        if (item.type !== "tabset" || !item.children) return item;

        const updatedChildren = item.children.map((child) => {
           if (!isTabNode(child) || child.id !== id) return child;

          return {
            ...child,
            config: {
              ...(child.config ?? {}),
              [key]: value
            }
          };
        });

        return updatedChildren === item.children
          ? item
          : { ...item, children: updatedChildren };
      })
    );
  };

  const updateItemConfigBatch = (
    id: string,
    nextConfig: Record<string, any>
  ) => {
    setItems(prev =>
      prev.map(item => {
        if (item.type !== "tabset" || !item.children) return item;

        const updatedChildren = item.children.map(child => {
          if (!isTabNode(child) || child.id !== id) return child;

          return {
            ...child,
            config: {
              ...(child.config ?? {}),
              ...nextConfig
            }
          };
        });

        return updatedChildren === item.children
          ? item
          : { ...item, children: updatedChildren };
      })
    );
  };

  const getItemConfig = <T = any>(
    id: string,
    key?: string
  ): T | Record<string, any> | undefined => {
    for (const item of items) {
      if (item.type !== "tabset" || !item.children) continue;

      for (const child of item.children) {
        if (!isTabNode(child) || child.id !== id) continue;

        const config = child.config ?? {};

        if (key) {
          return config[key] as T;
        }

        return config;
      }
    }

    return undefined;
  };

  return { items, addItem, removeItem, updateItemConfig, updateItemConfigBatch, getItemConfig };
}
