import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";

const AxisOptions = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label>X축 이름</Label>
        <Input placeholder="X Axis" />
      </div>

      <div>
        <Label>Y축 이름</Label>
        <Input placeholder="Y Axis" />
      </div>
    </div>
  );
};

export default AxisOptions;
