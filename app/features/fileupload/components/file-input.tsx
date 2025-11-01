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
    <Container>
      <h3>Excel 파일 업로드</h3>
        <div className="flex">
          <Input 
            id='fileupload'
            name='file'
            type='file'
            onChange={handleFileUpload}
            width={100}
          />
          <Button
            type="submit"
            variant={'outline'}
            onClick={handleClick}
          >
            Refresh
          </Button>
        </div>
      <h5>'각 시트는 하나의 테이블로 인식됩니다.'</h5>
    </Container>
  )
}

export default FileInput;