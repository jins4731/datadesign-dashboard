import { Table, CircleX } from "lucide-react";
import { Button } from "../../../common/components/ui/button";
import type { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../../../common/components/ui/drawer";
import type { TableData, TableNode } from "~/root";
import { TreeItem, useTreeViewApiRef, type TreeItemProps } from "@mui/x-tree-view";
import React, { useEffect, useState } from "react";
import { Dialog } from "../../../common/components/ui/dialog";
import { Confirm } from "../components/confirm";

const DataTables = ({dataTables, deleteNode}: {
  dataTables: TableData[],
  deleteNode: ({id, label, children}: {
    id: string;
    label: string;
    children: any[];
  }) => void
}) => {
  const tables: TreeViewBaseItem[] = dataTables.map((dt) => dt.table);
  const apiRef = useTreeViewApiRef();
  const [open, setOpen] = useState(false);
  const [node, setNode] = useState({
    id: '',
    label: '',
    children: []
  });

  const onClick = () => {
    setOpen(false);
    deleteNode(node);
    
    return;
  }

  const CustomCheckbox = React.forwardRef(function CustomCheckbox(
    props: React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>,
  ) {
    console.log('ref', ref);
    return <input type="checkbox" ref={ref} {...props} />;
  });

  const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    props: any,
    ref: React.Ref<HTMLLIElement>,
  ) {

    return (
      <TreeItem
        {...props}
        ref={ref}
        label={
          <div
            className="
              flex h-8 w-full items-center justify-between rounded-md
              px-2 text-sm
              hover:bg-muted/60
            "
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <Table className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{props.label}</span>
            </div>
            <Button 
              variant={'ghost'}
              size={'icon'}
              className="
                h-6 w-6 shrink-0
                transition-opacity
                group-hover:opacity-100
              "
              onClick={(e) => {
                e.stopPropagation(); // TreeItem으로 이벤트 전달 차단
                setOpen(true);

                const curNode = {
                  id: props.itemId,
                  label: props.label,
                  children: props.children
                };
                setNode(curNode);
              }}
            >
              <CircleX className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        }
      />
    );
  });

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader className="border-b">
        <DrawerTitle>Data Tables</DrawerTitle>
        <DrawerDescription>
          Your registered datasets
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex-1 overflow-auto p-3">
        <Dialog open={open} onOpenChange={setOpen}>
          <Confirm
            description="정말로 삭제하시겠습니까?"
            onClick={onClick}
          />
        </Dialog>
        {tables.length > 0 ? (
          <div className="rounded-lg border bg-background p-2">
            <RichTreeView
              apiRef={apiRef}
              items={tables}
              slots={{
                item: CustomTreeItem,
              }}
            />
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-muted-foreground">
            등록된 DataTable 이 없습니다
          </div>
        )}
      </div>
      <DrawerFooter className="border-t">
        {/* <Button onClick={() => {
          const focustItem = apiRef.current?.focusItem;
          
          console.log('focustItem', focustItem);
        }}>Submit</Button> */}
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
}

export default DataTables;
