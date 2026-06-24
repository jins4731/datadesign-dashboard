import { DEFAULT_COLORS, DEFAULT_TEXT_STYLE } from "../default/echart-options.defaults";
import type { AggregatedRow } from "../types/aggregation.types";
import type { ChartSettings, EChartsOptions } from "../types/chart-config.types";
import type { PieSeries, Tooltip } from "../types/echart-options.types";

export function buildPieChart(
  aggregated: AggregatedRow[],
  config: ChartSettings
): EChartsOptions {
  const { dataMapping, options } = config;
  const dimension = dataMapping.dimensions.find(d => d.isSelected);
  const measure = dataMapping.measures.find(m => m.isSelected);

  if (!dimension || !measure) {
    return {
      title: { text: 'Pie Chart', textStyle: { ...DEFAULT_TEXT_STYLE }, triggerEvent: true },
      legend: { show: true },
      series: []
    };
  }

  const title = {
    text: options?.title.text ?? 'Pie Chart',
    textStyle: { ...DEFAULT_TEXT_STYLE, ...options?.title.textStyle },
    subtext: '',
    triggerEvent: true
  };

  const tooltip: Tooltip = { trigger: 'item' };
  const legend = { show: options?.legend.show ?? false };

  const series: PieSeries[] = [{
    type: 'pie',
    radius: '70%',
    data: aggregated.map((row, i) => ({
      name: row[dimension.field] as string,
      value: row[measure.field] as number,
      itemStyle: { color: DEFAULT_COLORS[i % DEFAULT_COLORS.length] }
    }))
  }];

  return { title, series, tooltip, legend };
}

export function createPieChartSettings(): ChartSettings {
  return {
    type: 'pie',
    dataMapping: { dimensions: [], measures: [] },
    options: {
      title: {
        text: 'Pie Chart',
        textStyle: { ...DEFAULT_TEXT_STYLE },
        triggerEvent: true
      },
      series: [],
      legend: { show: true },
      tooltip: { trigger: 'item' }
    }
  };
}
