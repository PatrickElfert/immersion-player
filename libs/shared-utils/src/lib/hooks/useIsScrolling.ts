import { useEffect, useRef, useState } from 'react';

export function useIsScrolling(delay = 300) {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLDivElement| null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const onScroll = () => {
      setIsScrolling(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, delay);
    };

    el.addEventListener('scroll', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay]);

  return { isScrolling, ref: elementRef };
}
