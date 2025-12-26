import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import type { optionConfig } from "./itemOptionDialog";
import { Switch } from "~/common/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/common/components/ui/select";

const TitleDialog = ({
  config,
  setConfig
}: {
  config: optionConfig | null;
  setConfig: React.Dispatch<React.SetStateAction<optionConfig | null>>;
}) => {
  if (!config) return;

  const {options} = config;

  const handleValueChanged = (key: string, value: any) => {
    const newTitle = {
      ...options?.title,
      [key]: value
    }

    setConfig((prev) => ({
      ...prev,
      options: {
        ...prev?.options,
        title: newTitle
      }
    }));
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-lg font-semibold mt-3">
        {'Title'}
      </Label>
      <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">
              Display Name
            </Label>
            <Input
              type="text"
              value={options?.title.text}
              onChange={(e) =>
                handleValueChanged("text", e.target.value)
              }
            />
          </div>
          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">
              색상
            </Label>
            <Input
              type="color"
              value={options?.title.textStyle?.color}
              onChange={(e) =>
                handleValueChanged("textStyle", {
                  ...options?.title.textStyle,
                  color: e.target.value
                })
              }
            />
          </div>
          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">
              글자 굵기
            </Label>
            <Select
              value={options?.title.textStyle.fontWeight}
              onValueChange={(value) =>
                handleValueChanged("textStyle", {
                  ...options?.title.textStyle,
                  fontWeight: value
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="글자 굵기" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>fontWeight</SelectLabel>
                  {['normal', 'bolder', 'lighter'].map((v) => (
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
              글꼴
            </Label>
            <Select
              value={options?.title.textStyle.fontFamily}
              onValueChange={(value) =>
                handleValueChanged("textStyle", {
                  ...options?.title.textStyle,
                  fontFamily: value
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="글꼴" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>fontFamily</SelectLabel>
                  {["sans-serif", "serif", "monospace", "Arial", "Courier New"].map((v) => (
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
              글자 크기
            </Label>
            <Input
              type="number"
              value={options?.title.textStyle?.fontSize}
              onChange={(e) =>
                handleValueChanged("textStyle", {
                  ...options?.title.textStyle,
                  fontSize: Number(e.target.value)
                })
              }
            />
          </div>
        </div>
    </div>
  )
}

export default TitleDialog;
