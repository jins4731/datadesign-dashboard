// 차트 타입별 Step 순서 정의 (Workflow)
import type { PipelineStepName } from "../types/aggregation.types";
import type { ChartConfig } from "../types/chart-config.types";


// 차트종류별 Pipeline 정의
const pipelines: Record<string, PipelineStepName[]> = {
  bar: ["binding", "group", "aggregate", "options"],
  line: ["binding", "group", "aggregate", "options"],
  scatter: ["binding", "group", "aggregate", "options"],
  pie: ["binding", "group", "aggregate", "options"],
  pivot: ["group", "dataset"],
  table: ["transform", "dataset"]
};

// config(chartType)에 따라 적절한 pipeline 리턴
export function getPipeline(config: ChartConfig): PipelineStepName[] {
  return pipelines[config.type] ?? ["dataset"];
}
