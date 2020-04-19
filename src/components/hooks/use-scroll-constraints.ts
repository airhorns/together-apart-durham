import { useState, useEffect } from "react";
import { assert } from "../../lib/utils";

interface Constraints {
  top: number;
  bottom: number;
}

/**
 * Calculate the top/bottom scroll constraints of a full-screen element vs the viewport
 */
export function useScrollConstraints(ref: React.RefObject<HTMLElement>, measureConstraints: boolean) {
  const [constraints, setConstraints] = useState<Constraints>({
    top: 0,
    bottom: 0,
  });

  useEffect(() => {
    if (!measureConstraints) return;

    const element = assert(ref.current);
    const viewportHeight = window.innerHeight;
    const contentTop = element.offsetTop;
    const contentHeight = element.offsetHeight;
    const scrollableViewport = viewportHeight - contentTop * 2;
    const top = Math.min(scrollableViewport - contentHeight, 0);

    setConstraints({ top, bottom: 0 });
  }, [ref, measureConstraints]);

  return constraints;
}
