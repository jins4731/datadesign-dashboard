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
import type { DimensionField } from "~/engine/types/aggregation.types";

export type optionConfig = {
  dimensions?: DimensionField[]
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

  const getConfig = (id: string, componentType: string) => {
    if (componentType === 'xAxis') {
      return {
        dimensions: getItemConfig(id, 'dimensions'),
      }
    }
    return null;
  }

  const {componentType, id} = activeOption;
  const OptionDialog = renderOption(componentType);
  const [config, setConfig] =  useState<optionConfig | null>(
    getConfig(id, componentType)
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
  }

  return xAxisDialog;
}

export default ItemOptionDialog;