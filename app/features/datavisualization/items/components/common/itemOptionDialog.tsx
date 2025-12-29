import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/common/components/ui/tabs";
import type { ChartConfig, ChartType } from "~/engine/types/chart-config.types";
import CommonOptions from "./commonOptions";
import AxisOptions from "./axisOptions";
import SeriesOptions from "./seriesOptions";
import xAxisDialog from "./xAxisDialog";
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import { Button } from "~/common/components/ui/button";
import type { ActiveOption, getItemConfigFn, updateItemConfigBatchFn, UpdateItemConfigFn } from "~/features/datavisualization/pages/visualization";
import { useState } from "react";
import type { DimensionField, MeasureField } from "~/engine/types/aggregation.types";
import yAxisDialog from "./yAxisDialog";
import TitleDialog from "./titleDialog";
import SeriesDialog from "./seriesDialog";

export type optionConfig = {
  dimensions?: DimensionField[],
  measures?: MeasureField[],
  options?: Record<string, any>
};

const ItemOptionDialog = ({
  activeOption,
  getItemConfig,
  updateItemConfigBatch,
  close
}: {
  activeOption: ActiveOption | null;
  getItemConfig: getItemConfigFn;
  updateItemConfigBatch: updateItemConfigBatchFn;
  close: () => void;
}) => {

  // const hasAxis = type === "bar" || type === "line";
  console.log(activeOption);
  if (!activeOption) return;

  const getConfig = ({
    id,
    componentType
  }: {
    id: string;
    componentType: string;
  }) => {
    if (componentType === 'xAxis') {
      return {
        dimensions: getItemConfig(id, 'dimensions'),
        options: getItemConfig(id, 'options')
      }
    } else if (componentType === 'yAxis') {
      return {
        measures: getItemConfig(id, 'measures'),
        options: getItemConfig(id, 'options')
      }
    } else if (componentType === 'title') {
      return {
        options: getItemConfig(id, 'options')
      }
    } else if (componentType === 'series') {
      return {
        measures: getItemConfig(id, 'measures')
      }
    }
    return null;
  }

  const {componentType, id} = activeOption;
  const OptionDialog = renderOption(componentType);
  const [config, setConfig] =  useState<optionConfig | null>(
    getConfig({id, componentType})
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle>옵션 설정</DialogTitle>
          <OptionDialog
            config={config}
            setConfig={setConfig}
          />
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">취소</Button>
        </DialogClose>
        <Button 
          // onClick={onClick}
          onClick={(e) => {
            close();

            if (!config) return;
            updateItemConfigBatch(id, config);
          }}
        >
          확인
        </Button>
      </DialogFooter>
    </>
  )
}

const renderOption = (componentType: string) => {
  if (componentType === 'xAxis') {
    return xAxisDialog;
  } else if (componentType === 'yAxis') {
    return yAxisDialog;
  } else if (componentType === 'title') {
    return TitleDialog;
  } else if (componentType === 'series') {
    return SeriesDialog;
  }

  return xAxisDialog;
}

export default ItemOptionDialog;