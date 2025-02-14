import { useState } from 'react';

interface UseFileDropProps {
  onFileDrop?: (file: File) => void;
}

export function useFileDrop({ onFileDrop }: UseFileDropProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (checkValidExtension(droppedFile) && onFileDrop) {
        onFileDrop(droppedFile);
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
