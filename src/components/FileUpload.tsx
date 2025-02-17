import * as React from 'react';
import { css, Theme } from '@emotion/react';
import { useFileDrop } from 'hooks/useFileDrop.ts';
import { DragEvent, ChangeEvent } from 'react';

export type UploadFileEventType = DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>;

interface FileUploadProps {
  children: React.ReactNode;
  onFileDrop: (event: UploadFileEventType) => void;
}

export default function FileUpload({ children, onFileDrop }: FileUploadProps) {
  const { isDragOver, handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useFileDrop({
    onFileDrop,
  });

  return (
    <div
      css={theme => UploadCard(theme, isDragOver)}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}

const UploadCard = (theme: Theme, isDragOver: boolean) => css`
  ${theme.common.flex_column}
  align-items: center;
  width: 100%;
  margin: 0 auto;
  transition:
    background-color 0.3s ease,
    border 0.3s ease;
  background-color: ${isDragOver ? theme.color.dragOver : theme.color.white};
  border: 1px dashed ${isDragOver ? theme.color.primary : theme.color.border};
  border-radius: 8px;

  > p,
  > svg {
    pointer-events: none;
  }
`;
