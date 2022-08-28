import { RefObject } from 'react';
import useEventListener from './useEventListener';

type Handler = (_event: MouseEvent) => void;

function useOnClickOutSide<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
) {
  useEventListener(
    mouseEvent,
    (event) => {
      const el = ref?.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    },
    undefined,
    true
  );
}

export default useOnClickOutSide;
