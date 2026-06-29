import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useGsapTimeline(
  setup: (tl: gsap.core.Timeline) => void,
  deps: unknown[] = [],
) {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tlRef.current = tl;
    setup(tl);
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return tlRef;
}