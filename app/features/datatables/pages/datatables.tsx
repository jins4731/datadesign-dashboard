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
          <div className="flex items-center gap-1">
            <Table size={16} /> {/* 아이콘 */}
            {props.label}
            <Button 
              variant={'ghost'}
              size={'icon'}
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
              <CircleX />
            </Button>
          </div>
        }
      />
    );
  });

  return (
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Data Tables</DrawerTitle>
        <DrawerDescription>your datasets.</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <Dialog open={open} onOpenChange={setOpen}>
          <Confirm
            description="정말로 삭제하시겠습니까?"
            onClick={onClick}
          />
        </Dialog>
        <RichTreeView 
          apiRef={apiRef}
          items={tables}
          onSelectedItemsChange={(e, id) => {
            // console.log('e', e);
            // console.log('id', id);
          }}
          slots={{
            item: CustomTreeItem,
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
