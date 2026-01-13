import { useState } from "react";
import ExcelDataTable from "../components/excel-data-table";
import FileInput from "../components/file-input";
import type { Route } from "./+types/file-upload";

interface SheetData {
  sheetName: string;
  data: any[];
}

const FileUpload = ({actionData}: Route.ComponentProps) => {
  const [sheetData, setSheetData] = useState<SheetData[]>([]);

  return (
    <div className="flex flex-col gap-5 h-full">
      <FileInput setSheetData={setSheetData} />
      {/* {sheetData.length > 0 && (
      )} */}
      {/* 스크롤 영역 */}
      <div className="flex-1 min-h-0">
        <ExcelDataTable sheetData={sheetData} />
      </div>
    </div>
  )
}

export default FileUpload;