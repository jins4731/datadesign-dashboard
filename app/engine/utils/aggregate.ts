import type { AggregatedRow, DimensionField, MeasureField, PipelineContext } from "../types/aggregation.types";

export function aggregate(
  groupedData: Record<string, any[]>,
  dimensions: DimensionField[],
  measures: MeasureField[]
): AggregatedRow[] {
  const rows: AggregatedRow[] = [];
  const selectedDimensions = dimensions.filter((dim) => dim.isSelected);
  const selectedMeasures = measures.filter((mea) => mea.isSelected);

  for (const [groupKey, rowsInGroup] of Object.entries(groupedData)) {
    const base: AggregatedRow = {};

    // dimension key 기능
    const dimensionValues = groupKey.split("||");

    dimensionValues.forEach((value, idx) => {
    const dim = selectedDimensions[idx];

    if (!dim || !dim.isSelected) return;

    // label 있으면 label 사용, 없으면 field 사용
    const dimKey = dim.label ?? dim.field;

    base[dimKey] = value;
  });

    for (const m of selectedMeasures) {
      const values = rowsInGroup.map((r) => Number(r[m.field] ?? 0));

      let result = 0;
      switch (m.agg) {
        case "sum":
          result = values.reduce((a, b) => a + b, 0);
          break;

        case "avg":
          result =
            values.reduce((a, b) => a + b, 0) / (values.length || 1);
          break;

        case "min":
          result = Math.min(...values);
          break;

        case "max":
          result = Math.max(...values);
          break;

        case "count":
          result = values.length;
          break;

        case "distinctCount":
          result = new Set(values).size;
          break;
      }

      if (m.digits != null) {
        result = Number(result.toFixed(m.digits));
      }

      base[m.label ?? m.field] = result;
    }

    rows.push(base);
  }

  return rows;
}


export function aggregateStep(ctx: PipelineContext): PipelineContext {
  const { grouped, config } = ctx;
  if (!grouped) throw new Error("grouped data missing");

  ctx.aggregated = aggregate(
    grouped,
    config.dimensions,
    config.measures
  );

  return ctx;
}
