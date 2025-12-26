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
  console.log('options', options);

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

  const handleValueChanged = (key: string, value: any) => {
    const newYaxis = {
      ...options?.yAxis,
      [key]: value
    }

    setConfig((prev) => ({
      ...prev,
      options: {
        ...prev?.options,
        yAxis: newYaxis
      }
    }));
  }

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Title */}
      <Label className="text-lg font-semibold">Y 축</Label>

      {/* Y Axis Settings */}
      <div className="rounded-xl border bg-white p-4 space-y-4">
        <Label className="font-semibold">축 설정</Label>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">
              Display Name
            </Label>
            <Input
              type="text"
              value={options?.yAxis.name}
              onChange={(e) =>
                handleValueChanged("name", e.target.value)
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">
              위치
            </Label>
            <Select
              value={options?.yAxis.nameLocation}
              onValueChange={(value) =>
                handleValueChanged("nameLocation", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="위치 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Location</SelectLabel>
                  {["start", "middle", "end"].map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">
              색상
            </Label>
            <Input
              type="color"
              value={options?.yAxis.nameTextStyle?.color}
              onChange={(e) =>
                handleValueChanged("nameTextStyle", {
                  ...options?.yAxis.nameTextStyle,
                  color: e.target.value
                })
              }
            />
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">
              글자 크기
            </Label>
            <Input
              type="number"
              value={options?.yAxis.nameTextStyle?.fontSize}
              onChange={(e) =>
                handleValueChanged("nameTextStyle", {
                  ...options?.yAxis.nameTextStyle,
                  fontSize: Number(e.target.value)
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Measures */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {/* Measure List */}
        <div className="rounded-xl border p-3 space-y-2 overflow-y-auto">
          <Label className="font-semibold">측정값 목록</Label>

          {measures?.map((mea) => (
            <div
              key={mea.field}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors",
                activeRow?.field === mea.field
                  ? "bg-blue-50 border border-blue-300"
                  : "hover:bg-muted"
              )}
              onClick={() => handleRowClick(mea)}
            >
              <Checkbox
                checked={mea.isSelected}
                onCheckedChange={(value: boolean) =>
                  toggleCheck(value, mea.field)
                }
              />
              <span className="text-sm flex-1">{mea.label}</span>
            </div>
          ))}
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

                setConfig((prev) => ({
                  ...prev,
                  measures: nextMeasures
                }));

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

export default yAxisDialog;
