import { BarChartOptions, buildBarChartOptions } from "../charts/bar.config";
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
  }

  return buildBarChartOptions;
}

export const getOptions = (type: string) => {
  if (type === 'bar') {
    console.log(BarChartOptions);
    return BarChartOptions();
  }

  return BarChartOptions;
}

export function optionsStep(ctx: PipelineContext): PipelineContext {
  ctx.config.options = setOptions(ctx);
  return ctx;
}