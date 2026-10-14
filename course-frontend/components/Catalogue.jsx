"use client";

import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, selectVisibleCourses } from "@/store/slices/coursesSlice";
import { setCategory } from "@/store/slices/filtersSlice";
import CourseCard from "./CourseCard";
import CourseSkeleton from "./CourseSkeleton";

function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active
          ? "bg-indigo-600 text-white"
          : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-indigo-300 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

export default function Catalogue() {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((s) => s.courses);
  const category = useSelector((s) => s.filters.category);
  const items = useSelector(selectVisibleCourses);

  if (status === "idle" || status === "loading") return <CourseSkeleton />;

  if (status === "failed") {
    return (
      <div className="rounded-xl bg-white p-10 text-center ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
        <p className="text-slate-500 dark:text-slate-400">{error}</p>
        <p className="mt-1 text-xs text-slate-400">Make sure Strapi is running and NEXT_PUBLIC_STRAPI_URL is correct.</p>
        <button onClick={() => dispatch(fetchCourses())} className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Pill label="All" active={!category} onClick={() => dispatch(setCategory(""))} />
        {categories.map((c) => (
          <Pill key={c.id} label={c.name} active={category === c.name} onClick={() => dispatch(setCategory(c.name))} />
        ))}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {items.length} course{items.length === 1 ? "" : "s"} found
      </p>
      {items.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <CourseCard key={c.documentId} course={c} index={i} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-white p-10 text-center text-slate-500 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          No courses found.
        </p>
      )}
    </div>
  );
}
