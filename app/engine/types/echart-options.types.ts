/* ---------- 공통 타입 ---------- */

export type FontWeight = 'normal' | 'bolder' | 'lighter';
export type FontFamily =
  | 'sans-serif'
  | 'serif'
  | 'monospace'
  | 'Arial'
  | 'Courier New';
export type AxisType = 'value' | 'category' | 'time' | 'log';
export type LocationType = 'start' | 'middle' | 'end';

export interface TextStyle {
  color: string;
  fontWeight: FontWeight;
  fontFamily: FontFamily;
  fontSize: number;
}

export interface PartialTextStyle {
  color?: string;
  fontSize?: number;
}

export interface AxisLabel {
  show?: boolean;
  rotate?: number;
}

/* ---------- ECharts 옵션 ---------- */

export interface Dataset {
  dimensions: string[];
  source: Record<string, any>;
}

export interface Title {
  text: string;
  textStyle?: TextStyle;
  subtext?: string;
  subtextStyle?: TextStyle;
  triggerEvent: boolean;
}

export interface Tooltip {
  trigger: 'item' | 'axis' | 'none';
}

export interface Legend {
  show: boolean;
}

export interface Xaxis {
  type: AxisType;
  name: string;
  nameLocation: LocationType;
  nameTextStyle: PartialTextStyle;
  axisLabel?: AxisLabel;
  triggerEvent: boolean;
}

 export interface Yaxis {
  type: AxisType;
  name: string;
  nameLocation: LocationType;
  nameTextStyle: PartialTextStyle;
  axisLabel?: AxisLabel;
  triggerEvent: boolean;
}

export interface Series {
  type: string;
  name: string;
  encode: {
    x: string;
    y: string;
    itemName: string;
    tooltip?: string[];
  };
  colorBy?: 'series' | 'data';
  itemStyle?: {
    color?: string;
    borderType?: 'solid' | 'dashed' | 'dotted';
    borderColor?: string;
  };
}
