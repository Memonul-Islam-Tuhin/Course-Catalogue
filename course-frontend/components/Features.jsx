"use client";

import useReveal from "@/hooks/useReveal";

const FEATURES = [
  ["🎯", "Learn by doing", "Real projects in every course."],
  ["👩‍🏫", "Expert instructors", "Learn from working professionals."],
  ["🏆", "Track your progress", "Module progress bars keep you on track."],
];

function Feature({ icon, title, text, index }) {
  const ref = useReveal(index * 90);
  return (
    <div ref={ref} className="rv rounded-2xl bg-white p-6 text-center ring-1 ring-slate-200 hover:shadow-lg dark:bg-slate-800 dark:ring-slate-700">
      <div className="float mx-auto mb-3 text-4xl">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{text}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {FEATURES.map(([icon, title, text], i) => (
        <Feature key={title} icon={icon} title={title} text={text} index={i} />
      ))}
    </section>
  );
}
