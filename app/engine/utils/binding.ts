import type { TableNode } from "~/root";
import type { ChartSettings } from "../types/chart-config.types";
import { DEFAULT_COLORS } from "../default/echart-options.defaults";

export function binding(table: TableNode, config: ChartSettings): ChartSettings {
  const { dataMapping } = config;
  const { measures, dimensions } = dataMapping;

  if (measures.length !== 0 && dimensions.length !== 0) {
    return config;
  }

  const numberColumns = table.children.filter(child => child.type === 'number');
  const stringColumns = table.children.filter(child => child.type === 'string');

  dataMapping.measures = numberColumns.map((col, i) => ({
    field: col.label as string,
    label: col.label as string,
    agg: 'sum',
    parentId: col.parentId,
    digits: 2,
    isSelected: i === 0,
    color: DEFAULT_COLORS[i % DEFAULT_COLORS.length]
  }));

  dataMapping.dimensions = stringColumns.map((col, i) => ({
    field: col.label as string,
    label: col.label as string,
    parentId: col.parentId,
    sort: 'asc',
    isSelected: i === 0
  }));

  return config;
}
