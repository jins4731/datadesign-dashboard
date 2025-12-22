import type { DimensionField } from "../types/aggregation.types";

export function applySort(data: any[], dimensions: DimensionField[]) {
  const sortedDims = dimensions.filter((d) => d.sort);

  if (!sortedDims.length) return data;

  return [...data].sort((a, b) => {
    for (const d of sortedDims) {
      const va = a[d.field];
      const vb = b[d.field];

      if (va === vb) continue;

      return d.sort === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    }
    return 0;
  });
}
