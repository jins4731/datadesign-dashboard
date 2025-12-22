import type { PipelineStep, PipelineStepName } from "../types/aggregation.types";
import { aggregateStep } from "../utils/aggregate";
import { bindingStep } from "../utils/binding";
import { groupStep } from "../utils/group-by";
import { optionsStep } from "../utils/setOptions";

export const steps: Partial<Record<PipelineStepName, PipelineStep>> = {
  binding: bindingStep,
  group: groupStep,
  aggregate: aggregateStep,
  options: optionsStep
} as const;