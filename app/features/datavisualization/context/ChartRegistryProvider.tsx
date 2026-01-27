import { useMemo, useRef } from "react";
import type { ECharts } from "echarts";
import { ChartRegistryContext } from "./ChartRegistryContext";

type ChartRegistry = Map<string, ECharts>;

export function ChartRegistryProvider({ children }: { children: React.ReactNode }) {
  const registryRef = useRef<ChartRegistry>(new Map());

  const api = useMemo(() => ({
    register(id: string, chart: ECharts) {
      registryRef.current.set(id, chart);
    },
    unregister(id: string) {
      registryRef.current.delete(id);
    },
    get(id: string) {
      return registryRef.current.get(id);
    }
  }), []);

  return (
    <ChartRegistryContext.Provider value={api}>
      {children}
    </ChartRegistryContext.Provider>
  );
}
