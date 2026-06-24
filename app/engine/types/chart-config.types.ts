import type { DimensionField, FilterRule, MeasureField } from "./aggregation.types";
import type { Dataset, Legend, PieSeries, Series, Title, Tooltip, Xaxis, Yaxis } from "./echart-options.types";

export type ChartType = 'bar' | 'line' | 'scatter' | 'pie';

/** ECharts 라이브러리에 직접 전달되는 옵션 객체 */
export interface EChartsOptions {
  dataset?: Dataset[];
  title: Title;
  tooltip?: Tooltip;
  legend: Legend;
  xAxis?: Xaxis;
  yAxis?: Yaxis;
  series: Series[] | PieSeries[];
  subtitle?: string;
  colorPalette?: string[];
  viewControl?: Record<string, any>;
  grid3D?: Record<string, any>;
}

/** 사용자가 설정하는 차트 구성 (차트 종류, 컬럼 매핑, 필터 등) */
export interface ChartSettings {
  type: ChartType;
  dataMapping: {
    dimensions: DimensionField[];
    measures: MeasureField[];
  };
  filters?: FilterRule[];
  options?: EChartsOptions;
  seriesOptions?: Record<string, any>;
  renameMap?: Record<string, string>;
}
