import { Label } from "~/common/components/ui/label";
import type { optionConfig } from "./itemOptionDialog";
import { RadioGroup, RadioGroupItem } from "~/common/components/ui/radio-group";
import { useState } from "react";
import { aggregations, type MeasureField } from "~/engine/types/aggregation.types";
import { Checkbox } from "~/common/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/common/components/ui/select";
import { cn } from "~/lib/utils";
import type { PieSeries } from "~/engine/types/echart-options.types";

const PieSeriesDialog = ({
  config,
  setConfig
}: {
  config: optionConfig | null;
  setConfig: React.Dispatch<React.SetStateAction<optionConfig | null>>;
}) => {
  if (!config) return;

  const {dataMapping, options} = config;
  if (!options || !dataMapping) return;
  
  const {dimensions, measures} = dataMapping;
  if (!dimensions || !measures) return;

  const defaultValue = dimensions?.find((dim: any) => dim.isSelected)?.field;
  const defaultMeasure = measures.find((mea) => mea.isSelected)?.field ?? measures[0]?.field;

  const [activeRow, setActiveRow] = useState<MeasureField>(
    measures.find((mea) => mea.field === defaultMeasure) ?? measures[0]
  );

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Title */}
      <Label className="text-lg font-semibold">Series</Label>

      <div className="rounded-xl borde p-4 space-y-4">
        <Label className="font-semibold">차원 목록</Label>

        <RadioGroup
          defaultValue={defaultValue}
          onValueChange={(next) => {
            const nextDimensions = dimensions?.map((dim: any) => ({
              ...dim,
              isSelected: dim.field === next
            }));

            setConfig((prev) => ({
              ...prev!,
              dataMapping: {
                ...prev!.dataMapping,
                dimensions: nextDimensions
              }
            }));
          }}
          className="space-y-1"
        >
          {dimensions?.map((dim: any) => (
            <div
              key={dim.field}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors
                ${
                  dim.isSelected
                    ? "border bg-primary/55"
                    : "hover:bg-muted"
                }`}
            >
              <RadioGroupItem value={dim.field} id={dim.field} />
              <Label
                htmlFor={dim.field}
                className="cursor-pointer flex-1 text-sm"
              >
                {dim.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
        
      {/* Measures */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {/* Measure List */}
        <div className="rounded-xl border p-3 space-y-2 overflow-y-auto">
          <Label className="font-semibold">측정값 목록</Label>

            <RadioGroup
              value={activeRow?.field}
              onValueChange={(field) => {
                const nextMeasures = measures.map((mea) => ({
                  ...mea,
                  isSelected: mea.field === field
                }));

                setConfig((prev) => {
                  if (!prev) return prev;

                  return {
                    ...prev,
                    dataMapping: {
                      ...prev.dataMapping,
                      measures: nextMeasures
                    }
                  };
                });

                const selected = nextMeasures.find((m) => m.field === field);
                if (selected) setActiveRow(selected);
              }}
              className="space-y-1"
            >
              {measures.map((mea) => (
                <div
                  key={mea.field}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors",
                    activeRow?.field === mea.field
                      ? "border bg-primary/55"
                      : "hover:bg-muted"
                  )}
                >
                  <RadioGroupItem value={mea.field} id={mea.field} />
                  <Label
                    htmlFor={mea.field}
                    className="cursor-pointer flex-1 text-sm"
                  >
                    {mea.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
        </div>

        {/* Measure Properties */}
        <div className="rounded-xl border p-4 space-y-3">
          <Label className="font-semibold">측정값 속성</Label>

          <div className="space-y-2">
            <Label className="text-sm">Aggregation</Label>
            <Select
              value={activeRow?.agg}
              onValueChange={(value) => {
                const nextMeasures = measures?.map((mea: any) => {
                  if (mea.field === activeRow?.field) {
                    return {
                      ...mea,
                      agg: value
                    };
                  }
                  return mea;
                });

                setConfig((prev) => {
                  if (!prev) return prev;

                  return {
                    ...prev,
                    dataMapping: {
                      ...prev.dataMapping,
                      measures: nextMeasures
                    }
                  };
                });

                setActiveRow((prev: any) =>
                  prev ? { ...prev, agg: value } : prev
                );
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Aggregation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Aggregation</SelectLabel>
                  {aggregations.map((agg) => (
                    <SelectItem key={agg} value={agg}>
                      {agg}
                    </SelectItem>
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

export default PieSeriesDialog;
