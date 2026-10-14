const SKILLS = ["⚛️ React", "🎨 Tailwind CSS", "🗂️ Strapi CMS", "🛠️ Node.js", "🐈 NestJS", "📊 Data Analysis", "✏️ UI/UX", "🚀 Next.js", "🗃️ SQL"];

export default function Marquee() {
  return (
    <div className="overflow-hidden rounded-xl bg-white py-3 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
      <div className="marq">
        {[...SKILLS, ...SKILLS].map((s, i) => (
          <span key={i} className="mx-6 whitespace-nowrap text-sm font-medium text-slate-500 dark:text-slate-300">{s}</span>
        ))}
      </div>
    </div>
  );
}
