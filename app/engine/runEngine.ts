import type { TableNode } from "~/root";
import type { ChartSettings, ChartType, EChartsOptions } from "./types/chart-config.types";
import { binding } from "./utils/binding";
import { groupBy } from "./utils/group-by";
import { aggregate } from "./utils/aggregate";
import { buildEChartsOptions } from "./charts/buildEChartsOptions";
import { createAxisChartSettings } from "./charts/axisChart";
import { createPieChartSettings } from "./charts/pieChart";

export function runEngine(rawData: any[], table: TableNode, config: ChartSettings): EChartsOptions {
  const boundConfig = binding(table, config);
  const { dataMapping } = boundConfig;

  const grouped = groupBy(rawData, dataMapping.dimensions);
  const aggregated = aggregate(grouped, dataMapping.dimensions, dataMapping.measures);

  return buildEChartsOptions(config.type, aggregated, boundConfig);
}

export function createChartSettings(type: ChartType): ChartSettings {
  if (type === 'pie') return createPieChartSettings();
  return createAxisChartSettings(type);
}
