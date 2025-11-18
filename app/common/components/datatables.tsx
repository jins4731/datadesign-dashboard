import { Table, List } from "lucide-react";
import { Button } from "./ui/button";
import type { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "./ui/drawer";
import type { TableData } from "~/root";
import { useTreeViewApiRef } from "@mui/x-tree-view";


const DataTables = ({dataTables}: {dataTables: TableData[]}) => {
  const tables: TreeViewBaseItem[] = dataTables.map((dt) => dt.table);
  console.log('tables', tables);
  const apiRef = useTreeViewApiRef();

  return (
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Data Tables</DrawerTitle>
        <DrawerDescription>your datasets.</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <RichTreeView 
          apiRef={apiRef}
          slots={{
            expandIcon: Table,
            collapseIcon: Table,
            endIcon: List
          }}
          items={tables}
          onSelectedItemsChange={(e, id) => {
            console.log('e', e);
            console.log('id', id);
          }}
        />
      </div>
      <DrawerFooter>
        <Button onClick={() => {
          const focustItem = apiRef.current?.focusItem;
          
          console.log('focustItem', focustItem);
        }}>Submit</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
}

export default DataTables;
