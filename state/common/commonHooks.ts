import { useEffect, useRef } from 'react';

const useOutSideClick = (callback: () => void) => {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        callback();
    };

    document.addEventListener('click', handleClickOutSide, true);

    return () => {
      document.removeEventListener('click', handleClickOutSide, true);
    };
  }, [ref, callback]);

  return ref;
};

export { useOutSideClick };
