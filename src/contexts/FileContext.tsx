import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

export const FileContext = createContext<File | null>(null);

export const FileSetContext = createContext<Dispatch<SetStateAction<File | null>>>(() => {});

interface FileProviderProps {
  children: ReactNode;
}

export function FileProvider({ children }: FileProviderProps) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <FileContext.Provider value={file}>
      <FileSetContext.Provider value={setFile}>{children}</FileSetContext.Provider>
    </FileContext.Provider>
  );
}
