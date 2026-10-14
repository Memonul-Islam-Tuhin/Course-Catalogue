"use client";

import { useSelector } from "react-redux";
import CountUp from "./CountUp";

export default function Hero() {
  const { items, categories } = useSelector((s) => s.courses);
  const learners = items.reduce((sum, c) => sum + (c.learners || 0), 0);

  return (
    <section className="hero fade relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-6 py-12 text-white sm:px-12">
      <div className="float pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="float pointer-events-none absolute -bottom-12 left-1/3 h-40 w-40 rounded-full bg-pink-400/20 blur-2xl" style={{ animationDelay: "-2s" }} />
      <div className="pointer-events-none absolute right-8 top-8 hidden gap-4 text-4xl md:flex">
        <span className="float">⚛️</span>
        <span className="float" style={{ animationDelay: "-1.5s" }}>🎨</span>
        <span className="float" style={{ animationDelay: "-3s" }}>📊</span>
      </div>
      <p className="relative text-sm font-medium text-indigo-200">Learn without limits</p>
      <h1 className="relative mt-2 max-w-xl text-3xl font-extrabold tracking-tight sm:text-5xl">
        Find your{" "}
        <span className="bg-gradient-to-r from-amber-200 to-pink-200 bg-clip-text text-transparent">next course</span>{" "}
        and start learning today
      </h1>
      <p className="relative mt-3 max-w-lg text-indigo-100">
        Hands-on courses in web development, backend, design and data from expert instructors.
      </p>
      <div className="relative mt-8 flex flex-wrap gap-8 text-sm">
        <div><div className="text-2xl font-bold"><CountUp to={items.length} /></div>Courses</div>
        <div><div className="text-2xl font-bold"><CountUp to={categories.length} /></div>Categories</div>
        <div><div className="text-2xl font-bold"><CountUp to={Math.round(learners / 1000)} suffix="k+" /></div>Learners</div>
      </div>
    </section>
  );
}
