import type { DimensionField, GroupedData } from "../types/aggregation.types";

export function groupBy(data: any[], dimensions: DimensionField[]): GroupedData {
  const grouped: GroupedData = {};
  const selectedDimensions = dimensions.filter(d => d.isSelected);

  for (const row of data) {
    const key = selectedDimensions
      .map(d => String(row[d.field] ?? ''))
      .join('||');

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(row);
  }

  return grouped;
}
