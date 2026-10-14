"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useReveal from "@/hooks/useReveal";
import { setCategory } from "@/store/slices/filtersSlice";
import { subscribe } from "@/store/slices/uiSlice";
import SocialLinks from "./SocialLinks";

const hov = "transition hover:text-white hover:underline";

export default function Footer() {
  const dispatch = useDispatch();
  const ref = useReveal();
  const categories = useSelector((s) => s.courses.categories);
  const user = useSelector((s) => s.auth.user);
  const [email, setEmail] = useState("");

  const pick = (name) => {
    dispatch(setCategory(name));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(subscribe(email.trim()));
    setEmail("");
  };

  return (
    <footer className="mt-16 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div ref={ref} className="rv grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-indigo-400"
            >
              <span className="text-green-500">MIT </span>Learning
              <span className="text-white">Hub</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Hands-on courses in web development, backend, design and data from
              expert instructors.
            </p>
            <SocialLinks />
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" onClick={() => pick("")} className={hov}>
                  All courses
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href="/" onClick={() => pick(c.name)} className={hov}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Account</h4>
            <ul className="space-y-2.5 text-sm">
              {user ? (
                <li>
                  <Link href="/dashboard" className={hov}>
                    My courses
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/login" className={hov}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className={hov}>
                      Create account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              Stay updated
            </h4>
            <p className="mb-3 text-sm">
              Get new courses and offers in your inbox.
            </p>
            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
              />
              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-center text-xs sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} MIT LearningHub. Built with Next.js,
            Tailwind CSS &amp; Strapi CMS.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-full bg-slate-800 px-4 py-2 font-medium transition hover:bg-indigo-600 hover:text-white"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
