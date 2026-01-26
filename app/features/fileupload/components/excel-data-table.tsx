import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "~/common/components/ui/table";
import Container from "~/common/components/ui/container";
import SelectInput from "./select-input";
import { useEffect, useState } from "react";
import FileUploadPagination from "./file-upload-pagination";
import { useOutletContext, useSearchParams } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { ColumnNode, TableData } from "~/root";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/common/components/ui/select";
import { Checkbox } from "~/common/components/ui/checkbox";
import { Table2 } from "lucide-react";

type Column = {
  idx: number;
  key: string;
  type: string;
  checked: boolean;
};

const ExcelDataTable = ({sheetData}: {
  sheetData: {
    sheetName: string;
    data: any[]
  }[]
}) => {
  const [index, setIndex] = useState(0);
  const data = sheetData[index]?.data[0]; 
  const [columns, setColumns] = useState<Column[]>(
    data ? Object.keys(sheetData[index].data[0]).map((key, i) => ({
      idx: i,
      key,
      type: typeof sheetData[index].data[0][key],
      checked: true,
    })) : []
  );

  useEffect(() => {
    const currentData = sheetData[index]?.data[0];
    if (currentData) {
      const newColumns = Object.keys(currentData).map((key, i) => ({
        idx: i,
        key,
        type: typeof currentData[key],
        checked: true
      }));
      setColumns(newColumns);
    }
  }, [index, sheetData]);

  const [searchParams] = useSearchParams();
  const pageCount = 7;
  const page = Number(searchParams.get('page') ?? 1);
  const {addNode} = useOutletContext<{
    addNode: ({node}: {node: TableData}) => void;
  }>();

  const onClick = () => {
    if (sheetData.length > 0) {
      const curSheetData = sheetData[index];
      if (curSheetData) {
        const {sheetName, data} = curSheetData;
        const editColumns = columns.filter((column) => column.checked)

        const table = {
          id: sheetName,
          label: sheetName,
          children: editColumns.map((column): ColumnNode => {
            return {
              id: `${sheetName}_${column.key}`,
              parentId: sheetName,
              label: column.key,
              type: column.type,
              icon: <Table2 size={16} />
            }
          })
        };
        const node = {
          table,
          data
        }

        addNode({node});
      }

    }
  }
  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-4 p-4 border-dashed border-2 border-gray-300 rounded-xl">
      <div className="flex items-center justify-between border-b">
        <h3 className="text-xl font-semibold tracking-tight">WorkSheet 설정</h3>
        <p className="text-sm text-muted-foreground">
          사용할 컬럼과 데이터 타입을 선택하세요
        </p>
      </div>

      {/* Action Bar */}
      <div className="
        flex items-center justify-between
        rounded-xl border bg-muted/40
        px-5 py-1
        shadow-sm
      ">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            대상 시트
          </span>
          <SelectInput
            items={sheetData.map((s) => s.sheetName)}
            setIndex={setIndex}
            index={index}
          />
        </div>

        <Button 
          onClick={onClick}
          className="gap-2">
          <Table2 size={16} />
          데이터 테이블 추가
        </Button>
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-y-2 pr-2 scrollbar-thin">
        <div className="
          rounded-xl border bg-background
          p-3
          shadow-sm
          w-full
        ">
          <h4 className="font-medium mb-1">컬럼 설정</h4>

          <div className="overflow-x-auto max-w-full">
            <Table className="">
              <TableHeader>
                <TableRow className="bg-muted/30">
                  {sheetData[index] &&
                    Object.keys(sheetData[index].data[0]).map((key) => (
                      <TableHead key={key} className="font-semibold whitespace-nowrap">
                        {key}
                      </TableHead>
                    ))}
                </TableRow>

                {/* Type Selector */}
                <TableRow>
                  {columns.map((column, i) => (
                    <TableHead key={i} className="whitespace-nowrap">
                      <Select
                        value={column.type}
                        onValueChange={(v) => {
                          setColumns((prev) =>
                            prev.map((c) =>
                              c.idx === i ? { ...c, type: v } : c
                            )
                          );
                        }}
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="string">String</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="boolean">Boolean</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableHead>
                  ))}
                </TableRow>

                {/* Enable Toggle */}
                <TableRow>
                  {columns.map((column, i) => (
                    <TableHead key={column.idx} className="text-center align-middle">
                      <Checkbox
                        checked={column.checked}
                        onCheckedChange={(v) => {
                          setColumns((prev) =>
                            prev.map((c) =>
                              c.idx === i ? { ...c, checked: v === true } : c
                            )
                          );
                        }}
                      />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            </Table>
          </div>
        </div>

        {/* Data Preview */}
        <div className="rounded-xl border bg-background p-3 shadow-sm w-full">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium">데이터 미리보기</h4>
            <span className="text-sm text-muted-foreground">
              총 {sheetData[index]?.data.length ?? 0} rows
            </span>
          </div>

          <div className="overflow-x-auto max-w-full">
            <Table className=""> {/* w-max min-w-max */}
              <TableBody>
                {sheetData[index]?.data
                  .slice((page - 1) * pageCount, page * pageCount)
                  .map((row, i) => (
                    <TableRow key={i}>
                      {Object.values(row).map((v: any, idx) => (
                        <TableCell
                          className="whitespace-nowrap"
                          key={idx}
                        >
                          {v}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-end">
            <FileUploadPagination
              totalPages={
                sheetData[index]
                  ? Math.ceil(sheetData[index].data.length / pageCount)
                  : 1
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExcelDataTable;