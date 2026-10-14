// Strapi stores a short theme name; the full class strings live here so Tailwind can see them.
export const THEMES = {
  indigo: "from-indigo-500 to-blue-500",
  cyan: "from-cyan-500 to-teal-500",
  violet: "from-violet-500 to-purple-500",
  emerald: "from-emerald-500 to-green-500",
  pink: "from-pink-500 to-rose-500",
  amber: "from-amber-500 to-orange-500",
  sky: "from-sky-500 to-indigo-500",
  slate: "from-slate-500 to-slate-700",
};

export const gradient = (theme) => THEMES[theme] || THEMES.indigo;
