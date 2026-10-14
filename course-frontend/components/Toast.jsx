"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Toast() {
  const toast = useSelector((s) => s.ui.toast);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div
      className="pointer-events-none fixed left-1/2 z-30 -translate-x-1/2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition dark:bg-white dark:text-slate-900"
      style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom,0px))", opacity: visible ? 1 : 0 }}
    >
      {toast?.message}
    </div>
  );
}
