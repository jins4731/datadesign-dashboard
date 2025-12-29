import { BarChartOptions, buildBarChartOptions } from "../charts/bar.config";
import { buildLineChartOptions, LineChartOptions } from "../charts/line.config";
import type { PipelineContext } from "../types/aggregation.types";

export function setOptions(
  ctx: PipelineContext
){
  const { config } = ctx;
  const buildOptions = getBuildOptions(config.type);
  return buildOptions(ctx);
}

const getBuildOptions = (type: string) => {
  if (type === 'bar') {
    return buildBarChartOptions;
  } else if (type === 'line') {
    return buildLineChartOptions;
  }

  return buildBarChartOptions;
}

export const getOptions = (type: string) => {
  if (type === 'bar') {
    return BarChartOptions();
  } else if (type === 'line') {
    return LineChartOptions();
  }

  return BarChartOptions;
}

export function optionsStep(ctx: PipelineContext): PipelineContext {
  ctx.config.options = setOptions(ctx);
  return ctx;
}