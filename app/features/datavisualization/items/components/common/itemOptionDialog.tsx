import { type ChartConfig, type ChartOptions, type ChartType } from "~/engine/types/chart-config.types";
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
  dataMapping?: {
    dimensions?: DimensionField[],
    measures?: MeasureField[],
  };
  options?: Record<string, any>,
  type?: ChartType
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
    if (!allowed.includes(componentType)) return null;

    const chartConfig = getItemConfig<ChartConfig>(id);
    if (!chartConfig) return null;

    return {
      dataMapping: chartConfig.dataMapping,
      options: chartConfig.options,
      type: chartConfig.type
    };
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
      {/* Header */}
      <DialogHeader className="space-y-1">
        <DialogTitle className="text-lg font-semibold">
          옵션 설정
        </DialogTitle>
        <p className="text-sm text-muted-foreground">
          차트의 세부 옵션을 조정하세요
        </p>
      </DialogHeader>

      {/* Content */}
      <div className="mt-4 rounded-lg border bg-muted/30 p-4">
        <OptionDialog
          config={config}
          setConfig={setConfig}
        />
      </div>

      {/* Footer */}
      <DialogFooter className="mt-6 flex gap-2">
        <DialogClose asChild>
          <Button variant="outline">
            취소
          </Button>
        </DialogClose>

        <Button
          onClick={() => {
            close();
            if (!config) return;
            updateItemConfigBatch(id, config);
          }}
        >
          적용
        </Button>
      </DialogFooter>
    </>
  );

}

export default ItemOptionDialog;