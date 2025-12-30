import { BarChartOptions, buildBarChartOptions } from "../charts/bar.config";
import { buildLineChartOptions, LineChartOptions } from "../charts/line.config";
import { buildPieChartOptions, PieChartOptions } from "../charts/pie.config";
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
  } else if (type === 'pie') {
    return buildPieChartOptions;
  }

  return buildBarChartOptions;
}

export const getOptions = (type: string) => {
  if (type === 'bar') {
    return BarChartOptions();
  } else if (type === 'line') {
    return LineChartOptions();
  } else if (type === 'pie') {
    return PieChartOptions();
  }

  return BarChartOptions;
}

export function optionsStep(ctx: PipelineContext): PipelineContext {
  ctx.config.options = setOptions(ctx);
  return ctx;
}