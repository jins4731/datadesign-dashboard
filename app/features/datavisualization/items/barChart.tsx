import React from "react"
import type { TableData } from "~/root";
import ReactEcharts from 'echarts-for-react';
import { AggregationEngine } from "~/engine/core/engine";
import type { ChartConfig, ChartType } from "~/engine/types/chart-config.types";
import type { IJsonModel } from "flexlayout-react";
import type { ActiveOption } from "../pages/visualization";

const BarChart = ({
  id,
  selectedDataTable,
  config,
  openOption
}: {
  id: string;
  selectedDataTable?: TableData;
  config: ChartConfig;
  openOption: (option: ActiveOption) => void;
}) => {
  const [container, setContainer] = React.useState<HTMLElement | null>(null)

  console.log('selectedDataTable', selectedDataTable);
  if (!selectedDataTable) return null;

  const {data, table} = selectedDataTable;

  const result = React.useMemo(() => {
    const engine = new AggregationEngine();
    return engine.run(data, table, config);
  }, [data, table, config]);
  const {options: option} = result.config;

  const onEvents = {
    click: (params: any) => {
      const componentType = params.componentType;

      if (!['xAxis', 'yAxis', 'title'].includes(componentType)) return;

      console.log('open option', id, componentType);
      openOption({
        id,
        componentType,
      });      
    },
  };

  return (
    <div className="w-full h-full relative overflow-hidden" ref={setContainer}>
      <ReactEcharts
        option={option}
        onEvents={onEvents}
        style={{height: '100%', width: '100%'}}
      />
      {/* BarChart (nodeId {nodeId}) */}
    </div>
  )
}

export default BarChart
