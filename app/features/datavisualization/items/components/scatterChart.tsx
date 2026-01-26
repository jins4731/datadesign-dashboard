import React from "react"
import type { TableData } from "~/root";
import ReactEcharts from 'echarts-for-react';
import { AggregationEngine } from "~/engine/core/engine";
import type { ChartConfig } from "~/engine/types/chart-config.types";
import type { ActiveOption } from "../../pages/visualization";

const ScatterChart = ({
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

      if (!['xAxis', 'yAxis', 'title', 'series'].includes(componentType)) return;

      openOption({
        id,
        componentType
      });      
    },
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <ReactEcharts
        option={option}
        theme={"dark"}
        onEvents={onEvents}
        style={{height: '100%', width: '100%'}}
        replaceMerge={['series', 'xAxis', 'yAxis']}
      />
      {/* BarChart (nodeId {nodeId}) */}
    </div>
  )
}

export default ScatterChart;
