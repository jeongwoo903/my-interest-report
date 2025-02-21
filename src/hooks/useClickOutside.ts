import { RefObject, useEffect } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T | null>,
  callback: () => void,
) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      callback();
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);
}
