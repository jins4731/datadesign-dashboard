import { useState } from "react";
import ExcelDataTable from "../components/excel-data-table";
import FileInput from "../components/file-input";
import type { Route } from "./+types/file-upload";

interface SheetData {
  sheetName: string;
  data: any[];
}

export const action = async ({request}: Route.ActionArgs) => {

}

const FileUpload = ({actionData}: Route.ComponentProps) => {
  const [sheetData, setSheetData] = useState<SheetData[]>([]);

  return (
    <div>
      <FileInput
        setSheetData={setSheetData}
      />
      <ExcelDataTable
        sheetData={sheetData}
      />
    </div>
  )
}

export default FileUpload;