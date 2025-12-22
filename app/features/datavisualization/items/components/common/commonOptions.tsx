import { Label } from "~/common/components/ui/label";
import { Switch } from "~/common/components/ui/switch";


const CommonOptions = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>차트 제목 표시</Label>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <Label>툴팁 활성화</Label>
        <Switch />
      </div>
    </div>
  );
};

export default CommonOptions;
