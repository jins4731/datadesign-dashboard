import type { FilterRule } from "../types/aggregation.types";

export function applyFilters(data: any[], filters: FilterRule[]) {
  if (!filters?.length) return data;

  return data.filter((row) => {
    return filters.every((f) => {
      const v = row[f.field];
      const val = f.value;

      switch (f.operator) {
        case "=": return v === val;
        case "!=": return v !== val;
        case ">": return v > val;
        case "<": return v < val;
        case ">=": return v >= val;
        case "<=": return v <= val;
        case "in": return Array.isArray(val) && val.includes(v);
        case "not-in": return Array.isArray(val) && !val.includes(v);
        case "between":
          return v >= val[0] && v <= val[1];
        default:
          return true;
      }
    });
  });
}
