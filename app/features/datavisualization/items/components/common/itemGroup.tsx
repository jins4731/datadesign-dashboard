import { ChartBar, ChartLine, ChartPie, ChartScatter, PlusIcon  } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { ButtonGroup } from "~/common/components/ui/button-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/common/components/ui/select";
import type { ChartType } from "~/engine/types/chart-config.types";
import type { TableNode } from "~/root";
import { useLayoutItems } from "../../hook/useLayoutItems";
import type { IJsonModel } from "flexlayout-react";

const ItemGroup = ({
  tables,
  selectTable,
  addItem
}: {
  tables: TableNode[],
  selectTable: (id: string) => void,
  addItem: (type: ChartType) => void;
}
) => {
  const selectedTable = tables.find((table) => table.isSelected);

  const onClick = (type: ChartType) => {
    addItem(type);
  }
  
  return (
    <ButtonGroup>
      <Select
        value={selectedTable?.id ?? ""}
        onValueChange={(v) => {
          selectTable(v);
        }}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select DataTable" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>DataTable</SelectLabel>
            {
              tables.map((table) => (
                <SelectItem value={table.id}>{table.label}</SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon-lg"
        onClick={() => onClick('bar')}

      >
        <ChartBar/>
      </Button>
      <Button 
        variant="outline"
        size="icon-lg"
        onClick={() => onClick('line')}
      >
        <ChartLine/>
      </Button>
      <Button 
        variant="outline" 
        size="icon-lg"
        onClick={() => onClick('scatter')}
      >
        <ChartScatter />
      </Button>
      <Button 
        variant="outline" 
        size="icon-lg"
        onClick={() => onClick('pie')}
      >
        <ChartPie />
      </Button>
    </ButtonGroup>
  );
};

export default ItemGroup;
