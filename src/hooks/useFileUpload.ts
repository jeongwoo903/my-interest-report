import { useState, useRef } from 'react';
import { UploadFileEventType } from 'components/FileUpload.tsx';

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    fileInputMirrorClick,
  };
}
