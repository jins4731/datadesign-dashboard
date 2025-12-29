import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/common/components/ui/select";
import type { optionConfig } from "./itemOptionDialog";

// 'solid' | 'dashed' | 'dotted'
const SeriesDialog = ({
  config,
  setConfig
}: {
  config: optionConfig | null;
  setConfig: React.Dispatch<React.SetStateAction<optionConfig | null>>;
}) => {
  if (!config) return;

  const {measures} = config;

  const handleValueChanged = (key: string, field: string, value: any) => {
    const nextMeasures = measures?.map((mea) => {
      if (mea.field === field) {
        return {
          ...mea,
          [key]: value  // 여기서 체크 상태 반영
        };
      }
      return mea;
    });

    setConfig((prev) => ({
      ...prev,
      measures: nextMeasures
    }));
  }

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <Label className="text-lg font-semibold">색상</Label>

      {/* Series Settings */}
      <div className="rounded-xl border bg-white p-4 space-y-4">
        {
          measures?.map((me) => (
            <div
              key={me.field}
              className={`flex items-center justify-between gap-4 rounded-lg border px-3 py-2 transition ${
              !me.isSelected
                ? "opacity-50 cursor-not-allowed bg-muted/30"
                : "hover:bg-muted"}`}
            >
              <Label
                htmlFor={me.field}
                className="text-sm tfont-medium truncate"
              >
                {me.label ?? me.field}
              </Label>
              <Input
                type="color"
                value={me.color}
                disabled={!me.isSelected}
                className="h-8 w-10 cursor-pointer p-0 border-none bg-transparent"
                onChange={(e) =>
                  handleValueChanged("color", me.field, e.target.value)
                }
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default SeriesDialog;
