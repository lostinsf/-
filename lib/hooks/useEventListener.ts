import { useEffect, useRef } from 'react';

export function useEventListener(eventName: string, handler: any, element = window) {
  const savedHandler = useRef(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported || !savedHandler.current) {
      return undefined;
    }

    // @ts-ignore
    const eventListener = (event: any) => savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
