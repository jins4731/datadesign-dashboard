import { useEffect, useState } from "react";
import { Form } from "react-router";
import { Checkbox } from "~/common/components/ui/checkbox";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/common/components/ui/radio-group";
import { ScrollArea } from "~/common/components/ui/scroll-area";
import type { ActiveOption, getItemConfigFn, UpdateItemConfigFn } from "~/features/datavisualization/pages/visualization";
import { useLayoutItems } from "../../hook/useLayoutItems";
import type { optionConfig } from "./itemOptionDialog";

const xAxisDialog = ({
  config,
  setConfig
}: {
  config: optionConfig | null;
  setConfig: React.Dispatch<React.SetStateAction<optionConfig | null>>;
}) => {
  if (!config) return;

  const {dimensions} = config
  const defaultValue = dimensions?.find((dim: any) => dim.isSelected)?.field;

  return (
    <div className="space-y-2 flex flex-col">
      <Label className="flex flex-col gap-1">
        {'차원'}
      </Label>
      <RadioGroup
        defaultValue={defaultValue}
        onValueChange={(next) => {
          console.log("선택 변경:", next);

          const nextDimensions = dimensions?.map((dim: any) => ({
            ...dim,
            isSelected: dim.field === next,
          }));

          setConfig((prev) => {
            return {
              ...prev,
              dimensions: nextDimensions
            }
          })
        }}
      >
        {
          dimensions?.map((dim: any) => (
            <div key={dim.field} className="flex items-center gap-3">
              <RadioGroupItem
                value={dim.field}
                id={dim.field}
              />
              <Label htmlFor={dim.field}>{dim.label}</Label>
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default xAxisDialog;
