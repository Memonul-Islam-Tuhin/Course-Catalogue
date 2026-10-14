"use client";

import { useEffect, useState } from "react";

export default function CountUp({ to, suffix = "", duration = 1200 }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const k = Math.min((t - t0) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return <>{n}{suffix}</>;
}
