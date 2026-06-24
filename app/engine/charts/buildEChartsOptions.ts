import type { AggregatedRow } from "../types/aggregation.types";
import type { ChartSettings, ChartType, EChartsOptions } from "../types/chart-config.types";
import { buildAxisChart } from "./axisChart";
import { buildPieChart } from "./pieChart";

export function buildEChartsOptions(
  type: ChartType,
  aggregated: AggregatedRow[],
  config: ChartSettings
): EChartsOptions {
  if (type === 'pie') {
    return buildPieChart(aggregated, config);
  }
  return buildAxisChart(type, aggregated, config);
}
