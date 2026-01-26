import {
  ChartBar,
  ChartLine,
  ChartPie,
  ChartScatter,
} from "lucide-react";
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

  const chartButtons = [
    { type: "bar", icon: ChartBar, label: "Bar" },
    { type: "line", icon: ChartLine, label: "Line" },
    { type: "scatter", icon: ChartScatter, label: "Scatter" },
    { type: "pie", icon: ChartPie, label: "Pie" },
  ] as const;

  return (
    <div
      className="
        flex items-center gap-3
        rounded-xl border bg-background
        px-3 py-2 shadow-sm
      "
    >
      {/* DataTable Select */}
      <Select
        value={selectedTable?.id ?? ""}
        onValueChange={selectTable}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select DataTable" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>DataTable</SelectLabel>
            {tables.map((table) => (
              <SelectItem key={table.id} value={table.id}>
                {table.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Divider */}
      <div className="h-6 w-px bg-border" />

      {/* Chart Buttons */}
      <ButtonGroup className="flex divide-x divide-gray-300 dark:divide-gray-700">
        {chartButtons.map(({ type, icon: Icon, label }) => (
          <Button
            key={type}
            variant="default"
            size="icon-lg"
            disabled={disabled}
            onClick={() => addItem(type)}
            className="
              transition
              hover:bg-primary hover:text-primary-foreground
              disabled:opacity-40 disabled:hover:bg-background
            "
            title={`${label} Chart`}
          >
            <Icon className="h-5 w-5" />
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default ItemGroup;
