"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [w, setW] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      setW((window.scrollY / (d.scrollHeight - window.innerHeight || 1)) * 100);
      document.querySelector("header")?.classList.toggle("shadow-md", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-[3px] bg-gradient-to-r from-indigo-500 to-purple-500"
      style={{ width: `${w}%` }}
    />
  );
}
