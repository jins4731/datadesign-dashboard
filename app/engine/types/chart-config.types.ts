import type { DimensionField, FilterRule, MeasureField } from "./aggregation.types";
import type { Dataset, Legend, Series, Title, Tooltip, Xaxis, Yaxis } from "./echart-options.types";

/**
 * Chart 종류
 * (엔진 레지스트리에 등록될 때 사용)
 */
export type ChartType =
  | 'bar'
  | 'line'
  | 'pie';

export interface ChartOptions {
  dataset: Dataset[];
  title: Title;
  tooltip?: Tooltip;
  legend: Legend;
  // axis 옵션
  xAxis: Xaxis;
  yAxis: Yaxis;
  series?: Series[];

  subtitle?: string;
  colorPalette?: string[];
  // 3D 관련 옵션
  viewControl?: Record<string, any>;
  grid3D?: Record<string, any>;
}

/** Chart 의 전체 구성을 정의하는 핵심 타입 */
export interface ChartConfig {
  type: ChartType;                        // bar, pie, line, scatter3D 등
  dimensions: DimensionField[];             // group-by 기준
  measures: MeasureField[];                 // sum/avg/max/min 해야 하는 값
  filters?: FilterRule[];                   // 필터 조건
  options?: ChartOptions;            // 차트 전용 옵션(시리즈, 스타일 등)
  /**
   * 각 차트 전용 커스텀 옵션
   * bar/pie/scatter 등 차트마다 필요한 고유 옵션
   * 
   * 예:
   *   - Pie: radius, roseType
   *   - Bar: stack 옵션, barWidth
   *   - Scatter: symbolSize
   */
  seriesOptions?: Record<string, any>;
  /**
   * dataset 변환 후 컬럼 alias 를 만들고 싶을 때 사용
   * 예: { "상품가격_sum": "총 금액", "시도이름": "지역" }
   */
  renameMap?: Record<string, string>;
}
