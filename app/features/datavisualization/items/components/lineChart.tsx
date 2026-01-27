import type { ChartConfig } from "~/engine/types/chart-config.types";
import type { TableData } from "~/root";
import type { ActiveOption } from "../../pages/visualization";
import React, { useRef } from "react";
import { AggregationEngine } from "~/engine/core/engine";
import ReactEcharts from 'echarts-for-react';
import { useChartRegistry } from "../../hooks/useChartRegistry";

const LineChart = ({
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

  const { register } = useChartRegistry(id);
  const chartRef = useRef<ReactEcharts>(null);

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
        ref={chartRef}
        option={option}
        theme={"dark"}
        onEvents={onEvents}
        style={{height: '100%', width: '100%'}}
        replaceMerge={['series', 'xAxis', 'yAxis']}
        onChartReady={(chart) => {
          register(id, chart);
        }}
      />
      {/* BarChart (nodeId {nodeId}) */}
    </div>
  )
}

export default LineChart;
