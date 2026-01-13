import Container from "~/common/components/ui/container";
import { Input } from "~/common/components/ui/input"
import * as XLSX from 'xlsx';
import { Button } from "~/common/components/ui/button";
import { useState } from "react";

interface SheetData {
  sheetName: string;
  data: any[];
}

interface FileInputProps {
  setSheetData: React.Dispatch<React.SetStateAction<SheetData[]>>;
}

const FileInput = ({setSheetData}: FileInputProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }else {
      setFile(null);
    }
  }

  const handleClick = () => {
    if (!file) {
      setSheetData([]);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetData = workbook.SheetNames.map((name) => ({
        sheetName: name,
        data: XLSX.utils.sheet_to_json(workbook.Sheets[name], { defval: "" }),
      }));

      setSheetData(sheetData);
    };

    reader.readAsBinaryString(file);
  }
  
  return (
    <div className="border-dashed border-2 border-gray-300 rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-2">📂 Excel 파일 업로드</h3>
       <p className="text-sm text-muted-foreground mb-4">
        첫 행은 컬럼명으로 인식되며, 시트는 각각 하나의 테이블이 됩니다.
      </p>

        <div className="flex items-center gap-3">
          <Input 
            id='fileupload'
            name='file'
            type='file'
            onChange={handleFileUpload}
            className="cursor-pointer"
          />
          <Button
            variant={'default'}
            onClick={handleClick}
          >
            불러오기
          </Button>
        </div>
    </div>
  )
}

export default FileInput;