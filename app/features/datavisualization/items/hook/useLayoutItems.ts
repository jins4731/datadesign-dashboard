import { Actions, DockLocation, Model, type IJsonModel } from "flexlayout-react";
import { useState } from "react";
import { type ChartType } from "~/engine/types/chart-config.types";
import { getNextIndexFromLayout } from "../utils/layoutJson";
import { createChartSettings } from "~/engine/runEngine";

export type ChartConfigMap = Record<string, Record<string, any>>;

const EMPTY_MODEL: IJsonModel = {
  global: {},
  borders: [],
  layout: { type: "row", children: [] }
};

export function useLayoutItems(initial?: {
  layoutJson: IJsonModel;
  chartConfigs: ChartConfigMap;
}) {
  const [chartConfigs, setChartConfigs] = useState<ChartConfigMap>(
    initial?.chartConfigs ?? {}
  );
  const [model, setModel] = useState<Model>(() =>
    Model.fromJson(initial?.layoutJson ?? EMPTY_MODEL)
  );

  const addItem = (type: ChartType) => {
    const json = model.toJson();
    const layout = json.layout as any;
    const next = getNextIndexFromLayout(layout, type);
    const id = `item-${type}-${next}`;

    layout.children = layout.children ?? [];
    layout.children.push({
      type: "tabset",
      weight: 50,
      children: [{ type: "tab", id, name: `${type.toUpperCase()} Chart ${next}`, component: type }],
    });

    setModel(Model.fromJson({ ...json, layout }));
    setChartConfigs((prev) => ({ ...prev, [id]: createChartSettings(type) }));
  };

  const removeItem = (id: string) => {
    const newModel = Model.fromJson(model.toJson());
    newModel.doAction(Actions.deleteTab(id));
    setModel(newModel);
    setChartConfigs((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const updateItemConfig = <T = any>(id: string, key: string, value: T) => {
    setChartConfigs((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? {}), [key]: value }
    }));
  };

  const updateItemConfigBatch = (id: string, nextConfig: Record<string, any>) => {
    setChartConfigs((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? {}), ...nextConfig }
    }));
  };

  const getItemConfig = <T = any>(
    id: string,
    key?: string
  ): T | Record<string, any> | undefined => {
    const config = chartConfigs[id];
    if (!config) return undefined;
    return key ? (config[key] as T) : config;
  };

  return {
    model,
    chartConfigs,
    addItem,
    removeItem,
    updateItemConfig,
    updateItemConfigBatch,
    getItemConfig,
  };
}
