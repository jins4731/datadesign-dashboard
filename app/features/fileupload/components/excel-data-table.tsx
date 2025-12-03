import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "~/common/components/ui/table";
import Container from "~/common/components/ui/container";
import SelectInput from "./select-input";
import { useEffect, useState } from "react";
import FileUploadPagination from "./file-upload-pagination";
import { useOutletContext, useSearchParams } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { TableData } from "~/root";
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
  const pageCount = 10;
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
          children: editColumns.map((column) => {
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
    <Container>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">WorkSheet</h3>

        <div className="flex justify-between items-center">
          <SelectInput
            items={sheetData.map((s) => s.sheetName)}
            setIndex={setIndex}
            index={index}
          />

          <Button variant="outline" onClick={onClick}>
            Insert Data Table
          </Button>
        </div>
      </div>

      {/* Data Preview */}
      <h3 className="text-xl font-semibold mb-4">Data Preview</h3>
      <div className="border rounded-lg px-4 py-3 shadow-sm bg-white">
        <Table>
          <TableCaption className="text-muted-foreground">
            Preview of Worksheet Data
          </TableCaption>
          <TableHeader>
            <TableRow>
              {sheetData[index] && Object.keys(sheetData[index]?.data[0]).map((key) => (
                <TableHead
                  key={key}
                  className="font-semibold"
                >
                  {key}
                </TableHead>
              ))}
            </TableRow>
            <TableRow>
              {
                columns.map((column, i) => (
                  <TableHead key={i} className="p-2">
                    <Select
                      value={column.type}
                      onValueChange={(v) => {
                        const newColumns = columns.map((column) => {
                          if (column.idx === i) {
                            return {
                              ...column,
                              type: v
                            }
                          }

                          return column;
                        });
                        setColumns(newColumns);
                      }}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Type</SelectLabel>
                          <SelectItem value="number">Integer</SelectItem>
                          <SelectItem value="string">String</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="boolean">Boolean</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableHead>
                ))
              }
            </TableRow>
            <TableRow>
              {
                columns.map((column, i) => (
                  <TableHead
                    key={column.idx}
                    className="p-1 text-center"
                  >
                    <div className="flex justify-center items-center">
                      <Checkbox
                        checked={column.checked}
                        onCheckedChange={(v) => {
                          const newColumns = columns.map((column) => {
                            if (column.idx === i) {
                              return {
                                ...column,
                                checked: v === true
                              }
                            }

                            return column;
                          });
                          setColumns(newColumns);
                        }}
                      />
                    </div>
                  </TableHead>
                ))
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {sheetData[index] && sheetData[index].data
              .slice((page-1) * pageCount, page * pageCount)
              .map((invoice, i) => (
                <TableRow key={i}>
                  {Object.values(invoice).map((v: any, idx) => (
                    <TableCell key={idx} className="font-medium">{v}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length}>Total</TableCell>
              <TableCell className="text-right font-semibold">
                {sheetData[index] && sheetData[index].data.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <FileUploadPagination totalPages={sheetData[index] ?
          Math.ceil(sheetData[index].data.length / pageCount) : 1}/>
      </div>
    </Container>
  );
}

export default ExcelDataTable;