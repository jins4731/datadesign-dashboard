import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "~/common/components/ui/table";
import Container from "~/common/components/ui/container";
import SelectInput from "./select-input";
import { useState } from "react";
import FileUploadPagination from "./file-upload-pagination";
import { useOutletContext, useSearchParams } from "react-router";
import { Button } from "~/common/components/ui/button";

const ExcelDataTable = ({sheetData}: {
  sheetData: {
    sheetName: string;
    data: any[]
  }[]
}) => {
  const [index, setIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const pageCount = 10;
  const page = Number(searchParams.get('page') ?? 1);
  const setDataTables = useOutletContext<{setDataTables: React.Dispatch<React.SetStateAction<number>>}>()

  const onClick = () => {
    console.log('sheetData', sheetData);
    // const curSheetData = sheetData[index];
    // if (curSheetData) {
    //   const {sheetName, data} = curSheetData;
    //   const columns = Object.keys(data[0]);
    // }
  }
  return (
    <Container>
      <h3>WorkSheet</h3>
      <div className="flex justify-between">
        <SelectInput
          items={
            sheetData.length === 0 ? [] : 
            sheetData.map((data)=>data.sheetName)}
          setIndex={setIndex}
          index={index}
        />
        <Button
          variant={'outline'}
          onClick={onClick}
        >insert dataTable</Button>
      </div>
      <h3>Data Preview</h3>
      <div>
        <Table>
          <TableCaption>Table Caption</TableCaption>
          <TableHeader>
            <TableRow>
              {sheetData[index] && Object.keys(sheetData[index]?.data[0]).map((key) => (
                <TableHead>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sheetData[index] && sheetData[index].data
              .slice((page-1) * pageCount, page * pageCount - 1)
              .map((invoice, i) => (
                <TableRow key={i}>
                  {Object.values(invoice).map((v: any) => (
                    <TableCell className="font-medium">{v}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
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