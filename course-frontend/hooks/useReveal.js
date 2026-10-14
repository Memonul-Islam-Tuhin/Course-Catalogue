"use client";

import { useEffect, useRef } from "react";

/** Fades an element up when it scrolls into view. Put the `rv` class on the element. */
export default function useReveal(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
          setTimeout(() => { el.style.transitionDelay = ""; }, 1000);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return ref;
}
