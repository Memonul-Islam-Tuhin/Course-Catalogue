"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse, selectEnrollment, toggleLesson } from "@/store/slices/enrollmentsSlice";
import { showToast } from "@/store/slices/uiSlice";
import { gradient } from "@/lib/theme";
import { LESSONS, lessonKey, percent } from "@/lib/progress";
import { confetti } from "@/lib/confetti";
import ProgressBar from "./ProgressBar";

export default function CourseDetail({ slug }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, status } = useSelector((s) => s.courses);
  const user = useSelector((s) => s.auth.user);
  const enrollment = useSelector((s) => selectEnrollment(s, slug));
  const course = items.find((c) => c.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!course) {
    if (status === "succeeded" || status === "failed") {
      return (
        <p className="text-center text-slate-500">
          Course not found. <Link href="/" className="font-medium text-indigo-600 hover:underline">Back to courses</Link>
        </p>
      );
    }
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="sk aspect-video rounded-2xl" />
        <div className="sk h-8 w-2/3 rounded" />
        <div className="sk h-4 w-full rounded" />
      </div>
    );
  }

  const enrolled = !!enrollment;
  const completed = enrollment?.completed || [];
  const pct = percent(course, completed);

  const onEnroll = async () => {
    if (!user) {
      dispatch(showToast("Please log in to enroll"));
      return router.push("/login");
    }
    if (enrolled) return router.push("/dashboard");
    const res = await dispatch(enrollCourse(slug));
    if (res.error) return dispatch(showToast(res.payload || "Could not enroll"));
    dispatch(showToast("Enrolled successfully 🎉"));
    confetti();
  };

  const onTick = (key) => {
    if (!enrolled) return dispatch(showToast("Enroll to track your progress"));
    dispatch(toggleLesson({ slug, key }));
  };

  return (
    <article className="fade mx-auto max-w-3xl space-y-6">
      <Link href="/" className="text-sm font-medium text-indigo-600 hover:underline">← Back to courses</Link>

      <div className={`flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br ${gradient(course.theme)} text-7xl`}>
        {course.emoji}
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">{course.category?.name}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{course.level}</span>
        <span className="px-1 py-1">
          <span className="text-amber-500">★</span> <span className="font-semibold">{course.rating}</span> ({(course.learners || 0).toLocaleString("en-US")} learners)
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
      <p className="text-slate-500 dark:text-slate-400">Instructor: {course.instructor} · {course.duration}</p>
      <p className="whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300">{course.description}</p>

      {enrolled && (
        <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          <div className="mb-2 flex justify-between text-sm font-semibold">
            <span>Your progress</span>
            <span>{pct}%</span>
          </div>
          <ProgressBar value={pct} />
        </section>
      )}

      <section className="space-y-3">
        <h2 className="font-semibold">Course modules</h2>
        {course.modules.map((title, k) => {
          const done = LESSONS.filter((_, j) => completed.includes(lessonKey(k, j))).length;
          return (
            <div key={k} className="rounded-xl bg-white p-5 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-3 font-medium">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">{k + 1}</span>
                  {title}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{done}/{LESSONS.length}</span>
              </div>
              <div className="mt-3"><ProgressBar value={Math.round((done / LESSONS.length) * 100)} /></div>
              <div className="mt-3 flex flex-wrap gap-2">
                {LESSONS.map((name, j) => {
                  const key = lessonKey(k, j);
                  const on = completed.includes(key);
                  return (
                    <button
                      key={key}
                      onClick={() => onTick(key)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        on
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-600 hover:bg-indigo-50 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {on ? "✓ " : ""}{name}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <div className="flex items-center justify-between rounded-2xl bg-white p-6 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{course.duration}</p>
          <p className="text-2xl font-bold">{course.price ? `$${course.price}` : "Free"}</p>
        </div>
        <button
          onClick={onEnroll}
          className={`rounded-lg px-6 py-3 font-semibold text-white transition ${enrolled ? "bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
        >
          {enrolled ? "Enrolled ✓" : "Enroll now"}
        </button>
      </div>
    </article>
  );
}
