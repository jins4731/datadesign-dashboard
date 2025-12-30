import { type ChartType } from "~/engine/types/chart-config.types";
import xAxisDialog from "./xAxisDialog";
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import { Button } from "~/common/components/ui/button";
import type { ActiveOption, getItemConfigFn, updateItemConfigBatchFn, UpdateItemConfigFn } from "~/features/datavisualization/pages/visualization";
import { useState } from "react";
import type { DimensionField, MeasureField } from "~/engine/types/aggregation.types";
import yAxisDialog from "./yAxisDialog";
import TitleDialog from "./titleDialog";
import { CHART_OPTION_SUPPORT, SERIES_DIALOG_MAP } from "~/engine/default/echart-options.defaults";

export type optionConfig = {
  dimensions?: DimensionField[],
  measures?: MeasureField[],
  options?: Record<string, any>,
  type?: string
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

  const chartType  = getItemConfig(activeOption.id, 'type') as ChartType;
  const allowed = CHART_OPTION_SUPPORT[chartType];

  const getConfig = ({
    id,
    componentType
  }: {
    id: string;
    componentType: string;
  }) => {
    if (!allowed.includes(componentType)) {
      return null;
    }
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
        dimensions: getItemConfig(id, 'dimensions'),
        measures: getItemConfig(id, 'measures'),
        options: getItemConfig(id, 'options')
      }
    }
    return null;
  }

  const renderOption = (componentType: string) => {
    if (componentType === 'xAxis') return xAxisDialog;
    if (componentType === 'yAxis') return yAxisDialog;
    if (componentType === 'title') return TitleDialog;

    if (componentType === 'series') {
      return SERIES_DIALOG_MAP[chartType] ?? null;
    }

    return null;
  }

  const {componentType, id} = activeOption;
  const OptionDialog = renderOption(componentType);
  if (!OptionDialog) return null;
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

export default ItemOptionDialog;