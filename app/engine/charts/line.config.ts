import { DEFAULT_COLORS, DEFAULT_NAME_TEXT_STYLE, DEFAULT_TEXT_STYLE } from "../default/echart-options.defaults";
import type { PipelineContext } from "../types/aggregation.types";
import type { ChartConfig, ChartOptions } from "../types/chart-config.types";
import type { Series, Tooltip, Xaxis, Yaxis } from "../types/echart-options.types";

/**
 * Bar 차트용 설정 생성기
 * Pipeline에서 최종 단계에서 호출됨
 */
export function buildLineChartOptions(ctx: PipelineContext):ChartOptions {
  const { aggregated = [], config } = ctx;

  const selectedDimensions = config.dimensions.filter((dim) => dim.isSelected);
  const selectedMeasures = config.measures.filter((mea) => mea.isSelected);

  const dimensionKey = selectedDimensions.map((m) => m.label ?? m.field)[0];
  const measureKeys = selectedMeasures.map((m) => m.label ?? m.field);
  const {options} = config;

  /** ECharts dataset */
  const dataset = [{
    dimensions: [dimensionKey, ...measureKeys],
    source: aggregated
  }];

  const title = {
    text: options?.title.text || 'lineChart Title',
    textStyle: {
      ...DEFAULT_TEXT_STYLE,
      ...options?.title.textStyle
    },
    subtext: '',
    triggerEvent: true
  };

  const tooltip: Tooltip = {
    trigger: 'axis'
  };

  const legend = {
    show: options?.legend.show || false,
  };

  /** x축: dimension 하나만 사용 */
  const xAxis: Xaxis = {
    id: 'xAxis-main',
    type: "category",
    name: options?.xAxis?.name || '차원',
    nameLocation: options?.xAxis?.nameLocation || 'middle',
    nameTextStyle: {
      ...DEFAULT_NAME_TEXT_STYLE,
      ...options?.xAxis?.nameTextStyle
    },
    triggerEvent: true
  };

  /** y축 */
  const yAxis: Yaxis = {
    id: 'yAxis-main',
    type: "value",
    name: options?.yAxis?.name || '측정값',
    nameLocation: options?.yAxis?.nameLocation || 'middle',
    nameTextStyle: {
      ...DEFAULT_NAME_TEXT_STYLE,
      ...options?.yAxis?.nameTextStyle
    },
    triggerEvent: true
  };

  // const showBackground = true;
  // const backgroundStyle = {
  //   color: 'rgba(180, 180, 180, 0.2)'
  // }

  /** series: measure 수만큼 자동 생성 */
  const series: Series[] = selectedMeasures.map((m, i) => ({
    type: "line",
    name: m.label ?? m.field,
    encode: {
      x: dimensionKey,
      y: m.label ?? m.field,
      itemName: dimensionKey
    },
    itemStyle: {
      color: m.color
    }
  }));

  return {
    dataset,
    title,
    xAxis,
    yAxis,
    series,
    tooltip,
    legend
  };
}

/**
 * ChartConfig 에 등록해서 사용할 수 있는 팩토리
 */
export const LineChartOptions = (): ChartConfig => ({
  type: 'line',
  dimensions: [],
  measures: [],
  options: {
    dataset: [],
    title: {
      text: 'lineChart Title',
      textStyle: {
        ...DEFAULT_TEXT_STYLE
      },
      triggerEvent: true
    },
    xAxis: {
      id: 'xAxis-main',
      type: 'category',
      name: '차원',
      nameLocation: 'middle',
      nameTextStyle: {
        ...DEFAULT_NAME_TEXT_STYLE
      },
      triggerEvent: true
    },
    yAxis: {
      id: 'yAxis-main',
      type: 'value',
      name: '측정값',
      nameLocation: 'middle',
      nameTextStyle: {
        ...DEFAULT_NAME_TEXT_STYLE
      },
      triggerEvent: true
    },
    series: [],
    legend: {
      show: true
    },
    tooltip: {
      trigger: 'axis'
    }
  }
});
