"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  const { user, ready } = useSelector((s) => s.auth);

  return (
    <header
      className="sticky z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
      style={{ top: "env(safe-area-inset-top,0px)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-indigo-600"
        >
          <span className="text-green-500">MIT</span> Learning
          <span className="text-slate-900 dark:text-white">Hub</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium">
          {ready && !user && (
            <>
              <Link
                href="/login"
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
          {ready && user && <ProfileMenu user={user} />}
        </nav>
      </div>
    </header>
  );
}
