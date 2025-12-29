import type { TableNode } from "~/root";
import type { PipelineContext } from "../types/aggregation.types";
import type { ChartConfig } from "../types/chart-config.types";
import { DEFAULT_COLORS } from "../default/echart-options.defaults";

export function binding(
  table: TableNode,
  config: ChartConfig
): ChartConfig {
  const {measures, dimensions} = config;

  if (measures.length !== 0 && dimensions.length !== 0) {
    return config;
  }
  const {children} = table;

  const defaultMeasures = children.filter((child) => child.type === 'number');
  const defaultDimensions = children.filter((child) => child.type === 'string');
  
  config.measures = defaultMeasures.map((measure, i) => {
    return {
      field: measure?.label as string,
      label: measure?.label as string,
      agg: 'sum',
      parentId: measure?.parentId,
      digits: 2,
      isSelected: i === 0 ? true : false,
      color: DEFAULT_COLORS[i % 10]
    };
  });

  config.dimensions = defaultDimensions.map((dimension, i) => {
    return {
      field: dimension?.label as string,
      label: dimension?.label as string,
      parentId: dimension?.parentId,
      sort: 'asc',
      isSelected: i === 0 ? true : false
    };
  });
  
  return config;
}

export function bindingStep(ctx: PipelineContext): PipelineContext {
  const {table, config} = ctx;

  ctx.config = binding(table, config);

  return ctx;
}