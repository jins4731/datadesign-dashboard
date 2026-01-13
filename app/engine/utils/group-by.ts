import type { DimensionField, GroupedData, PipelineContext } from "../types/aggregation.types";

export function groupBy(
  data: any[],
  dimensions: DimensionField[]
): GroupedData {
  const grouped: GroupedData = {};
  const selectedDimensions = dimensions.filter(d => d.isSelected);

  for (const row of data) {
    // 복합키 생성
    const key = selectedDimensions
      .map((d) => String(row[d.field] ?? "")) // 각 dimension 값 가져오기
      .join("||"); // 구분자

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(row);
  }

  return grouped;
}

export function groupStep(ctx: PipelineContext): PipelineContext {
  const { rawData, config } = ctx;
  const {dataMapping} = config;
  const {dimensions} = dataMapping;
  3
  ctx.grouped = groupBy(rawData, dimensions ?? []);
  return ctx;
}