import type { PipelineContext } from "../types/aggregation.types";
import type { ChartConfig, ChartOptions } from "../types/chart-config.types";

/**
 * Bar 차트용 설정 생성기
 * Pipeline에서 최종 단계에서 호출됨
 */
export function buildBarChartOptions(ctx: PipelineContext) {
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
    text: options?.title.text || 'barChart Title',
    triggerEvent: true
  };

  const tooltip = {
    trigger: 'axis'
  };

  const legend = {
    show: options?.legend.show || false,
    top: 0,
  };

  /** x축: dimension 하나만 사용 */
  const xAxis = {
    type: "category",
    name: options?.xAxis.name || '차원',
    nameLocation: 'middle',
    axisLabel: { rotate: 0 },
    triggerEvent: true
  };

  /** y축 */
  const yAxis = {
    type: "value",
    name: options?.yAxis.name || '측정값',
    nameLocation: 'middle',
    triggerEvent: true
  };

  /** series: measure 수만큼 자동 생성 */
  const series = selectedMeasures.map((m) => ({
    type: "bar",
    name: m.label ?? m.field,
    encode: {
      x: dimensionKey,
      y: m.label ?? m.field,
      itemName: dimensionKey
    },
    // emphasis: { focus: "series" },
    // barMaxWidth: 40
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
export const BarChartOptions: ChartConfig = {
  type: 'bar',
  dimensions: [],
  measures: [],
  options: {
    dataset: [],
    title: {
      name: 'barChart Title'
    },
    xAxis: {
      name: '차원'
    },
    yAxis: {
      name: '측정값'
    },
    legend: {
      show: true
    },
    tooltip: {
      trigger: 'axis'
    }
  }
};
