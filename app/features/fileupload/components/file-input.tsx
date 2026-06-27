import * as XLSX from 'xlsx';
import { useRef, useState } from "react";
import { Upload, FileSpreadsheet, X } from "lucide-react";
import { Button } from "~/common/components/ui/button";

interface SheetData {
  sheetName: string;
  data: any[];
}

interface FileInputProps {
  setSheetData: React.Dispatch<React.SetStateAction<SheetData[]>>;
}

const FileInput = ({ setSheetData }: FileInputProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const parseFile = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;
      const workbook = XLSX.read(data, { type: "binary" });
      const parsed = workbook.SheetNames.map((name) => ({
        sheetName: name,
        data: XLSX.utils.sheet_to_json(workbook.Sheets[name], { defval: "" }),
      }));
      setSheetData(parsed);
    };
    reader.readAsBinaryString(f);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) parseFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) parseFile(f);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setSheetData([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      className={`
        relative flex flex-col items-center justify-center gap-4
        rounded-2xl border-2 border-dashed p-10 cursor-pointer
        transition-all duration-200 select-none
        ${isDragging
          ? 'border-primary bg-primary/5 scale-[1.01]'
          : file
            ? 'border-primary/40 bg-primary/5'
            : 'border-gray-300 dark:border-gray-700 hover:border-primary/50 hover:bg-muted/40'
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="hidden"
      />

      {file ? (
        <>
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10">
            <FileSpreadsheet className="h-7 w-7 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-sm">{file.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {(file.size / 1024).toFixed(1)} KB · 아래에서 시트를 설정하세요
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-7 text-xs text-muted-foreground hover:text-destructive"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            파일 제거
          </Button>
        </>
      ) : (
        <>
          <div className={`
            flex items-center justify-center w-14 h-14 rounded-2xl transition-colors
            ${isDragging ? 'bg-primary/20' : 'bg-muted'}
          `}>
            <Upload className={`h-7 w-7 transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="text-center space-y-1">
            <p className="font-semibold text-sm">
              {isDragging ? '여기에 놓으세요' : '파일을 드래그하거나 클릭하여 업로드'}
            </p>
            <p className="text-xs text-muted-foreground">.xlsx, .xls 파일 지원</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileInput;
