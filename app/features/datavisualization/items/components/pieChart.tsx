import type { ChartConfig } from "~/engine/types/chart-config.types";
import type { TableData } from "~/root";
import type { ActiveOption } from "../../pages/visualization";
import React from "react";
import { AggregationEngine } from "~/engine/core/engine";
import ReactEcharts from 'echarts-for-react';

const PieChart = ({
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
        onEvents={onEvents}
        style={{height: '100%', width: '100%'}}
        replaceMerge={['series', 'xAxis', 'yAxis']}
      />
      {/* BarChart (nodeId {nodeId}) */}
    </div>
  )
}

export default PieChart;
