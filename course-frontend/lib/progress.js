export const LESSONS = ["Video", "Reading", "Quiz"];

export const lessonKey = (moduleIndex, lessonIndex) => `${moduleIndex}-${lessonIndex}`;

export const totalLessons = (course) => (course.modules?.length || 0) * LESSONS.length;

export const percent = (course, completed = []) => {
  const total = totalLessons(course);
  return total ? Math.round((completed.length / total) * 100) : 0;
};
