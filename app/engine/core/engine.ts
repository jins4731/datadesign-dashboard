// /core/engine.ts

import type { TableNode } from "~/root";
import type { PipelineContext, PipelineStepName } from "../types/aggregation.types";
import type { ChartConfig } from "../types/chart-config.types";
import type { DatasetResult } from "../types/dataset.type";
import { getPipeline } from "./pipeline";
import { steps } from "./steps";

export class AggregationEngine {
  run(rawData: any[], table: TableNode, config: ChartConfig): PipelineContext {
    // 초기 context 생성
    let ctx: PipelineContext = {
      rawData,
      table,
      config
    };

    // pipeline steps 가져오기
    const pipeline: PipelineStepName[] = getPipeline(config);

    // pipeline 실행
    for (const stepName of pipeline) {
      const stepFn = steps[stepName];
      if (!stepFn) {
        throw new Error(`Pipeline step not found: ${stepName}`);
      }

      ctx = stepFn(ctx);
    }

    return ctx;
  }
}
