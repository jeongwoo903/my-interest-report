import { DragEvent, useState } from 'react';
import { UploadFileEventType } from 'components/FileUpload.tsx';

interface UseFileDropProps {
  onFileDrop: (event: UploadFileEventType) => void;
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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (checkValidExtension(droppedFile)) {
        onFileDrop(e);
      }
    }
  };

  function checkValidExtension(file: File) {
    const allowedExtensions = ['.csv', '.xlsx'];
    const fileName = file.name.toLowerCase();
    return allowedExtensions.some(ext => fileName.endsWith(ext));
  }

  return { isDragOver, handleDragEnter, handleDragLeave, handleDragOver, handleDrop };
}
