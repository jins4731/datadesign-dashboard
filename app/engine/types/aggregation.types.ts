export const aggregations: AggregationType[] = ['sum', 'avg', 'min', 'max', 'count', 'distinctCount'];

export type AggregationType = 'sum' | 'avg' | 'min' | 'max' | 'count' | 'distinctCount';
export type SortType = 'asc' | 'desc' | null;

export interface DimensionField {
  field: string;
  label: string;
  parentId?: string;
  sort?: SortType;
  isSelected: boolean;
}

export interface MeasureField {
  field: string;
  agg: AggregationType;
  label?: string;
  digits?: number;
  parentId?: string;
  isSelected: boolean;
  color?: string;
}

export interface FilterRule {
  field: string;
  operator: FilterOperator;
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

export type GroupedData = Record<string, any[]>;
export type AggregatedRow = Record<string, number | string>;
