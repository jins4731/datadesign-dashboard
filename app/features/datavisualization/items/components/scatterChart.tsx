import React, { useRef } from "react"
import type { TableData } from "~/root";
import ReactEcharts from 'echarts-for-react';
import { runEngine } from "~/engine/runEngine";
import type { ChartSettings } from "~/engine/types/chart-config.types";
import type { ActiveOption } from "../../pages/visualization";
import { useChartRegistry } from "../../hooks/useChartRegistry";

const ScatterChart = ({
  id,
  selectedDataTable,
  config,
  openOption
}: {
  id: string;
  selectedDataTable?: TableData;
  config: ChartSettings;
  openOption: (option: ActiveOption) => void;
}) => {
  if (!selectedDataTable) return null;

  const { register } = useChartRegistry(id);
  const chartRef = useRef<ReactEcharts>(null);
  const { data, table } = selectedDataTable;

  const option = React.useMemo(() => {
    return runEngine(data, table, config);
  }, [data, table, config]);

  const onEvents = {
    click: (params: any) => {
      const componentType = params.componentType;
      if (!['xAxis', 'yAxis', 'title', 'series'].includes(componentType)) return;
      openOption({ id, componentType });
    },
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <ReactEcharts
        ref={chartRef}
        option={option}
        theme={"dark"}
        onEvents={onEvents}
        style={{ height: '100%', width: '100%' }}
        replaceMerge={['series', 'xAxis', 'yAxis']}
        onChartReady={(chart) => {
          register(id, chart);
        }}
      />
    </div>
  );
}

export default ScatterChart;
