import * as React from 'react';
import { css, Theme } from '@emotion/react';

interface FileUploadProps {
  children: React.ReactNode;
}

export default function FileUpload({ children }: FileUploadProps) {
  return <div css={UploadCard}>{children}</div>;
}

const UploadCard = (theme: Theme) => css`
  ${theme.common.flex_column}
  align-items: center;
  width: 100%;
  margin: 0 auto;
  border: 1px dashed ${theme.color.border};
  border-radius: 8px;
`;
