"use client";

import Link from "next/link";
import useReveal from "@/hooks/useReveal";
import { gradient } from "@/lib/theme";
import ProgressBar from "./ProgressBar";

export default function CourseCard({ course, pct, index = 0 }) {
  const ref = useReveal((index % 3) * 90);

  return (
    <Link
      ref={ref}
      href={`/courses/${course.slug}`}
      className="rv shine group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800 dark:ring-slate-700"
    >
      {course.rating >= 4.9 && (
        <span className="absolute left-3 top-3 z-10 animate-pulse rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate-900">
          Bestseller
        </span>
      )}
      <div className={`flex aspect-video items-center justify-center bg-gradient-to-br ${gradient(course.theme)} text-5xl transition duration-500 group-hover:scale-110`}>
        {course.emoji}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            {course.category?.name}
          </span>
          <span className="text-slate-500 dark:text-slate-400">{course.level}</span>
        </div>
        <h3 className="text-lg font-semibold leading-snug group-hover:text-indigo-600">{course.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">by {course.instructor}</p>
        {pct !== undefined && (
          <div>
            <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Progress</span>
              <span>{pct}%</span>
            </div>
            <ProgressBar value={pct} />
          </div>
        )}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-sm dark:border-slate-700">
          <span>
            <span className="text-amber-500">★</span> <span className="font-semibold">{course.rating}</span>{" "}
            <span className="text-slate-400">({(course.learners || 0).toLocaleString("en-US")})</span>
          </span>
          <span className="font-bold">{course.price ? `$${course.price}` : "Free"}</span>
        </div>
      </div>
    </Link>
  );
}
