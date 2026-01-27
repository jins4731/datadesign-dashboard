import { createContext } from "react";
import type { ECharts } from "echarts";

export const ChartRegistryContext = createContext<{
  register: (id: string, chart: ECharts) => void;
  unregister: (id: string) => void;
  get: (id: string) => ECharts | undefined;
} | null>(null);
