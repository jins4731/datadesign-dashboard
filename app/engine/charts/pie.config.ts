import { DEFAULT_COLORS, DEFAULT_NAME_TEXT_STYLE, DEFAULT_TEXT_STYLE } from "../default/echart-options.defaults";
import type { PipelineContext } from "../types/aggregation.types";
import type { ChartConfig, ChartOptions } from "../types/chart-config.types";
import type { PieSeries, Series, Tooltip, Xaxis, Yaxis } from "../types/echart-options.types";

/**
 * Bar 차트용 설정 생성기
 * Pipeline에서 최종 단계에서 호출됨
 */
export function buildPieChartOptions(ctx: PipelineContext):ChartOptions{
  const { aggregated = [], config } = ctx;

  const dimension = config.dimensions.find((dim) => dim.isSelected);
  const measure = config.measures.find((mea) => mea.isSelected);

  if (!dimension || !measure) {
    return {
      title: {
        text: 'pieChart Title',
        textStyle: {
          ...DEFAULT_TEXT_STYLE
        },
        triggerEvent: true
      },
      legend: {
        show: true
      },
      series: [],
    };
  }

  const {options} = config;

  const title = {
    text: options?.title.text || 'pieChart Title',
    textStyle: {
      ...DEFAULT_TEXT_STYLE,
      ...options?.title.textStyle
    },
    subtext: '',
    triggerEvent: true
  };

  const tooltip: Tooltip = {
    trigger: 'item'
  };

  const legend = {
    show: options?.legend.show || false,
  };

  // const showBackground = true;
  // const backgroundStyle = {
  //   color: 'rgba(180, 180, 180, 0.2)'
  // }

  // const seriesOption = options?.series as PieSeries[];
  // const data = seriesOption[0]?.data;

  /** series */
  const series: PieSeries[] = [{
    type: "pie",
    radius: "70%",
    data: aggregated.map((row: any, i) => ({
      name: row[dimension.field],
      value: row[measure.field],
      itemStyle: {
        color: DEFAULT_COLORS[i % 10]
      }
    }))
  }];

  console.log('series', series);

  return {
    title,
    series,
    tooltip,
    legend
  };
}

/**
 * ChartConfig 에 등록해서 사용할 수 있는 팩토리
 */
export const PieChartOptions = (): ChartConfig => ({
  type: 'pie',
  dimensions: [],
  measures: [],
  options: {
    title: {
      text: 'pieChart Title',
      textStyle: {
        ...DEFAULT_TEXT_STYLE
      },
      triggerEvent: true
    },
    series: [],
    legend: {
      show: true
    },
    tooltip: {
      trigger: 'item'
    }
  }
});
