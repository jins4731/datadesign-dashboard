import type { AggregatedRow, DimensionField, MeasureField } from "../types/aggregation.types";

export function aggregate(
  groupedData: Record<string, any[]>,
  dimensions: DimensionField[],
  measures: MeasureField[]
): AggregatedRow[] {
  const rows: AggregatedRow[] = [];
  const selectedDimensions = dimensions.filter(d => d.isSelected);
  const selectedMeasures = measures.filter(m => m.isSelected);

  for (const [groupKey, rowsInGroup] of Object.entries(groupedData)) {
    const row: AggregatedRow = {};

    groupKey.split('||').forEach((value, idx) => {
      const dim = selectedDimensions[idx];
      if (!dim) return;
      row[dim.label ?? dim.field] = value;
    });

    for (const m of selectedMeasures) {
      const values = rowsInGroup.map(r => Number(r[m.field] ?? 0));

      let result = 0;
      switch (m.agg) {
        case 'sum':          result = values.reduce((a, b) => a + b, 0); break;
        case 'avg':          result = values.reduce((a, b) => a + b, 0) / (values.length || 1); break;
        case 'min':          result = Math.min(...values); break;
        case 'max':          result = Math.max(...values); break;
        case 'count':        result = values.length; break;
        case 'distinctCount': result = new Set(values).size; break;
      }

      if (m.digits != null) result = Number(result.toFixed(m.digits));
      row[m.label ?? m.field] = result;
    }

    rows.push(row);
  }

  return rows;
}
