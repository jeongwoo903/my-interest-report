import { useState, useRef } from 'react';
import { UploadFileEventType } from 'components/FileUpload.tsx';
import { excelToJson } from 'utils/excelToJson.ts';

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function parseExcelFile(file: File) {
    if (!file) throw new Error('파일이 없습니다.');
    return await excelToJson(file);
  }

  function getFile(event: UploadFileEventType): File | null {
    return 'dataTransfer' in event
      ? (event.dataTransfer?.files?.[0] ?? null)
      : (event.target.files?.[0] ?? null);
  }

  function uploadFile(event: UploadFileEventType) {
    const selectedFile = getFile(event);
    setFile(selectedFile);
  }

  function fileInputMirrorClick() {
    fileInputRef.current?.click();
  }

  return {
    file,
    fileInputRef,
    uploadFile,
    parseExcelFile,
    fileInputMirrorClick,
  };
}
