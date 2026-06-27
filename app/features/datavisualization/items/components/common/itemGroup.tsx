import { ChartBar, ChartLine, ChartPie, ChartScatter } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { ButtonGroup } from "~/common/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import type { ChartType } from "~/engine/types/chart-config.types";
import type { TableNode } from "~/root";

const chartButtons = [
  { type: "bar",     icon: ChartBar,     label: "Bar" },
  { type: "line",    icon: ChartLine,    label: "Line" },
  { type: "scatter", icon: ChartScatter, label: "Scatter" },
  { type: "pie",     icon: ChartPie,     label: "Pie" },
] as const;

const ItemGroup = ({
  tables,
  selectTable,
  addItem,
}: {
  tables: TableNode[];
  selectTable: (id: string) => void;
  addItem: (type: ChartType) => void;
}) => {
  const selectedTable = tables.find((t) => t.isSelected);
  const disabled = !selectedTable;

  return (
    <div className="flex items-center gap-3">
      <Select value={selectedTable?.id ?? ""} onValueChange={selectTable}>
        <SelectTrigger className="w-[160px] h-8 text-xs">
          <SelectValue placeholder="데이터 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>데이터 테이블</SelectLabel>
            {tables.map((table) => (
              <SelectItem key={table.id} value={table.id}>
                {table.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="h-5 w-px bg-border" />

      <ButtonGroup className="flex divide-x divide-gray-200 dark:divide-gray-700">
        {chartButtons.map(({ type, icon: Icon, label }) => (
          <Button
            key={type}
            variant="default"
            size="icon-lg"
            disabled={disabled}
            onClick={() => addItem(type)}
            title={`${label} Chart`}
            className="disabled:opacity-30"
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default ItemGroup;
