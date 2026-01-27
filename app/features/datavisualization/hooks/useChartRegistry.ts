import { useContext, useEffect } from "react"
import { ChartRegistryContext } from "../context/ChartRegistryContext"

export const useChartRegistry = (id: string) => {
  const registry = useContext(ChartRegistryContext);
  if (!registry) throw new Error("ChartRegistryProvider missing");

  const { register, unregister } = registry;

  useEffect(() => {
    return () => unregister(id);
  }, [id, unregister]);

  return { register };
}