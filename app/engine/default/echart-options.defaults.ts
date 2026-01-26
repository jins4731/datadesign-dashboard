import type { ActiveOption } from "~/features/datavisualization/pages/visualization";
import type { ChartType } from "../types/chart-config.types";
import type { PartialTextStyle, TextStyle } from "../types/echart-options.types";
import BarSeriesDialog from "~/features/datavisualization/items/components/common/barSeriesDialog";
import PieSeriesDialog from "~/features/datavisualization/items/components/common/pieSeriesDialog";

export const DEFAULT_TEXT_STYLE: TextStyle = {
  color: '#eeeeee',
  fontWeight: 'bolder',
  fontFamily: 'sans-serif',
  fontSize: 18,
};

export const DEFAULT_NAME_TEXT_STYLE: PartialTextStyle = {
  color: '#eeeeee',
  fontSize: 12
};

// export const DEFAULT_COLORS = [
//   '#5470C6',
//   '#91CC75',
//   '#FAC858',
//   '#EE6666',
//   '#73C0DE',
//   '#3BA272',
//   '#FC8452',
//   '#9A60B4',
//   '#EA7CCC'
// ];
export const DEFAULT_COLORS = [
  '#A78BFA', // violet-400
  '#8B5CF6', // violet-500
  '#7C3AED', // violet-600
  '#6D28D9', // violet-700
  '#5B21B6', // violet-800
  '#4C1D95', // violet-900
  '#C4B5FD', // violet-300
  '#DDD6FE', // violet-200
  '#EDE9FE', // violet-100
];

export const CHART_OPTION_SUPPORT: Record<ChartType, ActiveOption['componentType'][]> = {
  bar: ['xAxis', 'yAxis', 'series', 'title'],
  line: ['xAxis', 'yAxis', 'series', 'title'],
  scatter: ['xAxis', 'yAxis', 'series', 'title'],
  pie: ['series', 'title'],
};

export const SERIES_DIALOG_MAP: Record<ChartType, React.FC<any>> = {
  bar: BarSeriesDialog,
  line: BarSeriesDialog,
  scatter: BarSeriesDialog,
  pie: PieSeriesDialog,
};

