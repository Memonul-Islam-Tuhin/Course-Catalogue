"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { percent } from "@/lib/progress";
import CourseCard from "./CourseCard";

export default function Dashboard() {
  const router = useRouter();
  const { user, ready } = useSelector((s) => s.auth);
  const courses = useSelector((s) => s.courses.items);
  const enrollments = useSelector((s) => s.enrollments.items);

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!user) return null;

  const mine = enrollments
    .map((e) => ({ e, course: courses.find((c) => c.slug === e.courseSlug) }))
    .filter((x) => x.course);

  return (
    <div className="fade space-y-6">
      <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
        <h1 className="text-2xl font-bold">Hello, {user.username} 👋</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {user.email} · Joined {new Date(user.createdAt).toLocaleDateString("en-US")}
        </p>
      </div>

      <h2 className="text-xl font-semibold">My courses ({mine.length})</h2>
      {mine.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mine.map(({ e, course }, i) => (
            <CourseCard key={e.documentId} course={course} pct={percent(course, e.completed)} index={i} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-white p-10 text-center text-slate-500 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          You have not enrolled yet.{" "}
          <Link href="/" className="font-medium text-indigo-600 hover:underline">Browse courses</Link>
        </p>
      )}
    </div>
  );
}
