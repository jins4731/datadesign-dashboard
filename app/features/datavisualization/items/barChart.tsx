import React from "react"
import type { TableData } from "~/root";
import ReactEcharts from 'echarts-for-react';
import { AggregationEngine } from "~/engine/core/engine";
import type { ChartConfig, ChartType } from "~/engine/types/chart-config.types";
import type { IJsonModel } from "flexlayout-react";
import type { ActiveOption } from "../pages/visualization";

const BarChart = ({
  nodeId,
  selectedDataTable,
  config,
  setOpen,
  setActiveOption
}: {
  nodeId: string;
  selectedDataTable?: TableData;
  config: ChartConfig;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setActiveOption: React.Dispatch<React.SetStateAction<ActiveOption | null>>
}) => {
  const [container, setContainer] = React.useState<HTMLElement | null>(null)

  console.log('selectedDataTable', selectedDataTable);
  if (!selectedDataTable) return null;

  const {data, table} = selectedDataTable;

  const engine = new AggregationEngine();
  const result = engine.run(data, table, config);
  const {options: option} = result.config;

  const onEvents = {
    click: (params: any) => {
      console.log(params);
      const componentType = params.componentType;

      if (componentType !== 'xAxis' &&
        componentType !== 'yAxis' &&
        componentType !== 'title'
      ) {
        return;
      }

      const activeOption = {
        componentType,
        id: nodeId,
      }
    
      setActiveOption(activeOption);      
      setOpen(true);
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
