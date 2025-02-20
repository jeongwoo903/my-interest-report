import { DragEvent, useState } from 'react';
import { UploadFileEventType } from 'components/FileUpload.tsx';

interface UseFileDropProps {
  onFileDrop: (e: UploadFileEventType) => void;
}

export function useFileDrop({ onFileDrop }: UseFileDropProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;

    if (!files.length) return;

    if (files.length > 1) {
      alert('한 번에 하나의 파일만 업로드할 수 있습니다.');
      return;
    }

    const droppedFile = files[0];

    if (!checkValidExtension(droppedFile)) {
      alert('지원하지 않는 파일 형식입니다. xlsx 또는 csv 파일만 허용됩니다.');
      return;
    }

    onFileDrop(e);
  };

  function checkValidExtension(file: File) {
    const allowedExtensions = ['.csv', '.xlsx'];
    const fileName = file.name.toLowerCase();
    return allowedExtensions.some(ext => fileName.endsWith(ext));
  }

  return { isDragOver, handleDragEnter, handleDragLeave, handleDragOver, handleDrop };
}
