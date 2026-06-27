import { useState } from "react";
import ExcelDataTable from "../components/excel-data-table";
import FileInput from "../components/file-input";
import type { Route } from "./+types/file-upload";
import { requireUser } from "~/server/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  await requireUser(request);
  return null;
}

interface SheetData {
  sheetName: string;
  data: any[];
}

const FileUpload = () => {
  const [sheetData, setSheetData] = useState<SheetData[]>([]);

  return (
    <div className="flex flex-col gap-5 h-full">
      <FileInput setSheetData={setSheetData} />
      {sheetData.length > 0 && (
        <div className="flex-1 min-h-0 min-w-0">
          <ExcelDataTable sheetData={sheetData} />
        </div>
      )}
      {/* 스크롤 영역 */}
    </div>
  )
}

export default FileUpload;