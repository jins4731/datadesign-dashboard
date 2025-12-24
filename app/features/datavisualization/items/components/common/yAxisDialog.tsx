import { Label } from "~/common/components/ui/label";
import type { optionConfig } from "./itemOptionDialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/common/components/ui/select";
import type { AggregationType, MeasureField } from "~/engine/types/aggregation.types";
import { Checkbox } from "~/common/components/ui/checkbox";
import { Input } from "~/common/components/ui/input";
import { useState } from "react";
import { cn } from "~/lib/utils";

const yAxisDialog = ({
  config,
  setConfig
}: {
  config: optionConfig | null;
  setConfig: React.Dispatch<React.SetStateAction<optionConfig | null>>;
}) => {
  if (!config) return;

  const {measures, options} = config;

  if (!measures) return;

  const aggregations: AggregationType[] = [
    'sum',
    'avg',
    'min',
    'max',
    'count',
    'distinctCount'
  ];

  const [activeRow, setActiveRow] = useState<MeasureField>(measures[0]);

  const handleRowClick = (measure: MeasureField) => {
    setActiveRow(measure);
  }

  const toggleCheck = (checked: boolean, measureField: string) => {
    const nextMeasures = measures?.map((mea) => {
      if (mea.field === measureField) {
        return {
          ...mea,
          isSelected: checked  // 여기서 체크 상태 반영
        };
      }
      return mea;
    });

    setConfig((prev) => ({
      ...prev,
      measures: nextMeasures
    }));
  };

  return (
    <div className="flex flex-col gap-2 h-80">
      <Label className="text-lg font-semibold mt-3">
        {'Y 축'}
      </Label>
      <div className="flex flex-row gap-2 w-full h-full">
        <div className="flex flex-col gap-3 w-1/2 border rounded-lg p-3 overflow-y-auto">
          <Label className="font-medium">{'측정값 목록'}</Label>
          {
            measures?.map((mea) => (
              <div
                key={mea.field}
                className={cn(
                  "flex items-center gap-3 cursor-pointer p-2 rounded transition-colors",
                  {
                    "bg-blue-50 border border-blue-400": activeRow?.field === mea.field,
                    "hover:bg-gray-100": activeRow?.field !== mea.field,
                  }
                )}
                onClick={() => handleRowClick(mea)}
              >
                <Checkbox
                  // checked={false}
                  checked={mea.isSelected}
                  onCheckedChange={(value: boolean) => toggleCheck(value, mea.field)}
                />
                <Label 
                  className="cursor-pointer flex-1"
                  // onClick={() => handleRowClick(mea.id)}
                >
                  {mea.label}
                </Label>
              </div>
            ))
          }
          <Label className="mt-4 font-medium">{'Display name'}</Label>
          <Input 
            type='text'
            name='displayName'
            value={options?.yAxis.name}
            onChange={(e) => {
              const newYaxis = {
                ...options?.yAxis,
                name: e.target.value
              }

              setConfig((prev) => ({
                ...prev,
                options: {
                  ...prev?.options,
                  yAxis: newYaxis
                }
              }));
            }}
          />
        </div>
        <div className="flex flex-col gap-4 w-1/2 border p-3 rounded">
          <Label className="font-medium">{'측정값 속성'}</Label>
          <div className="flex flex-col gap-2">
            <Label>{'Aggregation'}</Label>
            <Select
              value={activeRow?.agg}
              onValueChange={(value) => {
                const nextMeasures = measures?.map((mea: any) => {
                  if (mea.field === activeRow?.field) {
                    return ({
                      ...mea,
                      agg: value
                    })
                  }
                  return mea;
                });

                setConfig((prev) => {
                  return {
                    ...prev,
                    measures: nextMeasures
                  }
                })
                setActiveRow((prev: any) => prev ? { ...prev, agg: value } : prev);
              }}
            >
              <SelectTrigger className="w-full border rounded-md">
                <SelectValue placeholder="Select a Aggregation"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Aggregation</SelectLabel>
                  {aggregations.map((agg) => (
                    <SelectItem value={agg}>{agg}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default yAxisDialog;
