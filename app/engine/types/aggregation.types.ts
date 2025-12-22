import type { TableNode } from "~/root";
import type { ChartConfig } from "./chart-config.types";

/** Aggregation 종류 */
export type AggregationType =
  | 'sum'
  | 'avg'
  | 'min'
  | 'max'
  | 'count'
  | 'distinctCount';
export type SortType = | 'asc' | 'desc' | null;

/** Dimension (분류 기준) */
export interface DimensionField {
  field: string;
  label: string;
  parentId?: string;
  sort?: SortType;
  isSelected: boolean;
}

/** Measure (계산해야 하는 값) */
export interface MeasureField {
  field: string;                     // e.g. "상품가격"
  agg: AggregationType;              // sum, avg, max, min...
  label?: string;                    // UI 표시 이름
  digits?: number;                   // 소수점 자리
  parentId?: string;
  isSelected: boolean;
}

/** 필터 타입 */
export interface FilterRule {
  field: string;
  operator: FilterOperator;   // =, >, <, between 등
  value: any;
}

export type FilterOperator =
  | '='
  | '!='
  | '>'
  | '<'
  | '>='
  | '<='
  | 'in'
  | 'not-in'
  | 'between';



/** Grouping 결과 형태 */
export type GroupedData = Record<string, any[]>;

/** Aggregation 결과 형태 */
export type AggregatedRow = Record<string, number | string>;

/** Pipeline 입력/출력 */
export interface PipelineContext {
  rawData: any[];             // Excel or JSON raw data,
  table: TableNode;
  config: ChartConfig;        // chartConfig builder 가 만들어 준 설정
  grouped?: GroupedData;      // group-by 결과
  aggregated?: AggregatedRow[]; // 집계된 결과
  dataset?: any;              // echart dataset-ready output
}

/** 파이프라인 단계 이름 */
export type PipelineStepName =
  | 'filter'
  | 'binding'
  | 'group'
  | 'aggregate'
  | 'transform'
  | 'options'
  | 'dataset';

/** 파이프라인 단계 정의 */
export type PipelineStep = (ctx: PipelineContext) => PipelineContext;