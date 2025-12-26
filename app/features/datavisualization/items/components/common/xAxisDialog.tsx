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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/common/components/ui/select";

const xAxisDialog = ({
  config,
  setConfig
}: {
  config: optionConfig | null;
  setConfig: React.Dispatch<React.SetStateAction<optionConfig | null>>;
}) => {
  if (!config) return;

  // const dummyData = [
  //   { field: "시군구", isSelected: false, label: "시군구", parentId: "그리드3", sort: "asc" },
  //   { field: "읍면동", isSelected: false, label: "읍면동", parentId: "그리드3", sort: "asc" },
  //   { field: "도로명", isSelected: false, label: "도로명", parentId: "그리드3", sort: "desc" },
  //   { field: "건물번호", isSelected: false, label: "건물번호", parentId: "그리드3", sort: "asc" },
  //   { field: "우편번호", isSelected: false, label: "우편번호", parentId: "그리드3", sort: "desc" },
  //   { field: "상호명", isSelected: false, label: "상호명", parentId: "그리드3", sort: "asc" },
  //   { field: "업종", isSelected: false, label: "업종", parentId: "그리드3", sort: "asc" },
  //   { field: "전화번호", isSelected: false, label: "전화번호", parentId: "그리드3", sort: "desc" },
  //   { field: "등록일", isSelected: false, label: "등록일", parentId: "그리드3", sort: "asc" }
  // ]
  const {dimensions, options} = config;
  
  const defaultValue = dimensions?.find((dim: any) => dim.isSelected)?.field;

  const handleValueChanged = (key: string, value: any) => {
    const newXaxis = {
      ...options?.xAxis,
      [key]: value
    }

    setConfig((prev) => ({
      ...prev,
      options: {
        ...prev?.options,
        xAxis: newXaxis
      }
    }));
  }

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Title */}
      <Label className="text-lg font-semibold">X 축</Label>

      {/* Axis Settings */}
      <div className="rounded-xl border bg-white p-4 space-y-4">
        <Label className="font-semibold">축 설정</Label>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">
              Display Name
            </Label>
            <Input
              type="text"
              value={options?.xAxis.name}
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
              value={options?.xAxis.nameLocation}
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
              value={options?.xAxis.nameTextStyle?.color}
              onChange={(e) =>
                handleValueChanged("nameTextStyle", {
                  ...options?.xAxis.nameTextStyle,
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
              value={options?.xAxis.nameTextStyle?.fontSize}
              onChange={(e) =>
                handleValueChanged("nameTextStyle", {
                  ...options?.xAxis.nameTextStyle,
                  fontSize: Number(e.target.value)
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Dimension List */}
      <div className="rounded-xl border p-3 space-y-3 overflow-y-auto flex-1">
        <Label className="font-semibold">차원 목록</Label>

        <RadioGroup
          defaultValue={defaultValue}
          onValueChange={(next) => {
            const nextDimensions = dimensions?.map((dim: any) => ({
              ...dim,
              isSelected: dim.field === next
            }));

            setConfig((prev) => ({
              ...prev,
              dimensions: nextDimensions
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
                    ? "bg-blue-50 border border-blue-300"
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
    </div>
  );
}

export default xAxisDialog;
