import type { ChartConfig} from "./chart-config.types";

export type DatasetRow = Record<string, any>;

/** ECharts transform 구조 */
export interface EChartTransform {
  type: string;
  config?: Record<string, any>;
}

/** 여러 transform 지원 */
export type EChartTransforms = EChartTransform[];

export interface ChartDataset {
  /** ECharts dataset.source */
  source: DatasetRow[];

  /** dimensions 순서 */
  // dimensions: string[];

  /** ECharts dataset.transform */
  transform?: EChartTransforms;
}

export type DatasetResult = { type: 'eChart'; dataset: ChartDataset };

export interface DatasetFormatter {
  format(data: any[], config: ChartConfig): DatasetResult;
}