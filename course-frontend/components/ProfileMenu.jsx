"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/slices/authSlice";
import { showToast } from "@/store/slices/uiSlice";

const item = "block w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700";

export default function ProfileMenu({ user }) {
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const close = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const logout = async () => {
    setOpen(false);
    await dispatch(logoutUser());
    dispatch(showToast("Logged out"));
    router.push("/login");
  };

  return (
    <div ref={box} className="relative">
      <button
        aria-label="Profile"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white ring-2 ring-transparent transition hover:ring-indigo-300"
      >
        {user.username?.[0]?.toUpperCase()}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <p className="truncate text-sm font-semibold">{user.username}</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
          </div>
          <Link href="/dashboard" onClick={() => setOpen(false)} className={item}>My courses</Link>
          <button onClick={logout} className={`${item} text-red-600`}>Logout</button>
        </div>
      )}
    </div>
  );
}
