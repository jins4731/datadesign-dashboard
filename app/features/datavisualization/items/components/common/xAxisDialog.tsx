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

  return (
    <div className="flex flex-col gap-2 h-80">
      <Label className="text-lg font-semibold mt-3">
        {'X 축'}
      </Label>
      <div className="flex flex-col gap-3 w-full h-full border rounded-lg p-3 overflow-y-auto">
        <Label className="font-medium">{'차원 목록'}</Label>
        <RadioGroup
          defaultValue={defaultValue}
          onValueChange={(next) => {
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
              <div
                className="flex items-center gap-3"
                key={dim.field}
              >
                <RadioGroupItem
                  value={dim.field}
                  id={dim.field}
                />
                <Label 
                  htmlFor={dim.field}
                  className={` p-2 rounded cursor-pointer transition-colors w-full
                  ${dim.isSelected ? "bg-blue-50 border border-blue-400" : "hover:bg-gray-100"}`}
                >
                    {dim.label}
                </Label>
              </div>
            ))
          }
        </RadioGroup>
        <Label className="mt-4 font-medium">{'Display name'}</Label>
          <Input 
            type='text'
            name='displayName'
            value={options?.xAxis.name}
            onChange={(e) => {
              const newXaxis = {
                ...options?.xAxis,
                name: e.target.value
              }

              setConfig((prev) => ({
                ...prev,
                options: {
                  ...prev?.options,
                  xAxis: newXaxis
                }
              }));
            }}
          />
      </div>
    </div>
  )
}

export default xAxisDialog;
