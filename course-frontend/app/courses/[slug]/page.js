import CourseDetail from "@/components/CourseDetail";
import { STRAPI_URL } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/courses?filters[slug][$eq]=${encodeURIComponent(slug)}`,
      { cache: "no-store" },
    );
    const course = (await res.json()).data?.[0];
    if (course)
      return {
        title: `${course.title} – MIT-LearningHub`,
        description: course.description?.slice(0, 160),
      };
  } catch {}
  return { title: "Course – MIT-LearningHub" };
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  return <CourseDetail slug={slug} />;
}
