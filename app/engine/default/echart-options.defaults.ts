import type { ActiveOption } from "~/features/datavisualization/pages/visualization";
import type { ChartType } from "../types/chart-config.types";
import type { PartialTextStyle, TextStyle } from "../types/echart-options.types";
import BarSeriesDialog from "~/features/datavisualization/items/components/common/barSeriesDialog";
import PieSeriesDialog from "~/features/datavisualization/items/components/common/pieSeriesDialog";

export const DEFAULT_TEXT_STYLE: TextStyle = {
  color: '#333',
  fontWeight: 'bolder',
  fontFamily: 'sans-serif',
  fontSize: 18,
};

export const DEFAULT_NAME_TEXT_STYLE: PartialTextStyle = {
  color: '#333',
  fontSize: 12
};

export const DEFAULT_COLORS = [
  '#5470C6',
  '#91CC75',
  '#FAC858',
  '#EE6666',
  '#73C0DE',
  '#3BA272',
  '#FC8452',
  '#9A60B4',
  '#EA7CCC'
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

