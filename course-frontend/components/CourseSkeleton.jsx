export default function CourseSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          <div className="sk aspect-video" />
          <div className="space-y-3 p-5">
            <div className="sk h-4 w-1/3 rounded" />
            <div className="sk h-5 w-4/5 rounded" />
            <div className="sk h-4 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
