import { DEFAULT_NAME_TEXT_STYLE, DEFAULT_TEXT_STYLE } from "../default/echart-options.defaults";
import type { AggregatedRow } from "../types/aggregation.types";
import type { ChartSettings, EChartsOptions } from "../types/chart-config.types";
import type { Series, Tooltip, Xaxis, Yaxis } from "../types/echart-options.types";

type AxisChartType = 'bar' | 'line' | 'scatter';

export function buildAxisChart(
  type: AxisChartType,
  aggregated: AggregatedRow[],
  config: ChartSettings
): EChartsOptions {
  const { dataMapping, options } = config;
  const selectedDimensions = dataMapping.dimensions.filter(d => d.isSelected);
  const selectedMeasures = dataMapping.measures.filter(m => m.isSelected);

  const dimensionKey = selectedDimensions[0]?.label ?? selectedDimensions[0]?.field ?? '';
  const measureKeys = selectedMeasures.map(m => m.label ?? m.field);

  const dataset = [{
    dimensions: [dimensionKey, ...measureKeys],
    source: aggregated
  }];

  const title = {
    text: options?.title.text ?? `${type} Chart`,
    textStyle: { ...DEFAULT_TEXT_STYLE, ...options?.title.textStyle },
    subtext: '',
    triggerEvent: true
  };

  const tooltip: Tooltip = { trigger: 'axis' };
  const legend = { show: options?.legend.show ?? false };

  const xAxis: Xaxis = {
    id: 'xAxis-main',
    type: 'category',
    name: options?.xAxis?.name ?? '차원',
    nameLocation: options?.xAxis?.nameLocation ?? 'middle',
    nameTextStyle: { ...DEFAULT_NAME_TEXT_STYLE, ...options?.xAxis?.nameTextStyle },
    triggerEvent: true
  };

  const yAxis: Yaxis = {
    id: 'yAxis-main',
    type: 'value',
    name: options?.yAxis?.name ?? '측정값',
    nameLocation: options?.yAxis?.nameLocation ?? 'middle',
    nameTextStyle: { ...DEFAULT_NAME_TEXT_STYLE, ...options?.yAxis?.nameTextStyle },
    triggerEvent: true
  };

  const series: Series[] = selectedMeasures.map(m => ({
    type,
    name: m.label ?? m.field,
    encode: {
      x: dimensionKey,
      y: m.label ?? m.field,
      itemName: dimensionKey
    },
    itemStyle: { color: m.color }
  }));

  return { dataset, title, xAxis, yAxis, series, tooltip, legend };
}

export function createAxisChartSettings(type: AxisChartType): ChartSettings {
  return {
    type,
    dataMapping: { dimensions: [], measures: [] },
    options: {
      title: {
        text: `${type} Chart`,
        textStyle: { ...DEFAULT_TEXT_STYLE },
        triggerEvent: true
      },
      xAxis: {
        id: 'xAxis-main',
        type: 'category',
        name: '차원',
        nameLocation: 'middle',
        nameTextStyle: { ...DEFAULT_NAME_TEXT_STYLE },
        triggerEvent: true
      },
      yAxis: {
        id: 'yAxis-main',
        type: 'value',
        name: '측정값',
        nameLocation: 'middle',
        nameTextStyle: { ...DEFAULT_NAME_TEXT_STYLE },
        triggerEvent: true
      },
      series: [],
      legend: { show: true },
      tooltip: { trigger: 'axis' }
    }
  };
}
