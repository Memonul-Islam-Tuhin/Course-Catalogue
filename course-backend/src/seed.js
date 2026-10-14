'use strict';

// Sample data (same courses as the live demo). Runs once, only when there are no courses yet.
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const CATEGORIES = ['Web Development', 'Backend', 'Design', 'Data'];

const COURSES = [
  { slug: 'nextjs-complete', title: 'Next.js 15 Complete Guide', category: 'Web Development', level: 'Intermediate', instructor: 'Sarah Khan', duration: '8 weeks', price: 49, rating: 4.9, learners: 3120, emoji: '⚛️', theme: 'indigo',
    description: 'Build full-stack apps with the App Router, server components, data fetching and deployment. Includes three real projects and a headless CMS integration.',
    modules: ['Project setup & routing', 'Server and client components', 'Data fetching with Strapi', 'Authentication with cookies', 'Deploying to Netlify'] },
  { slug: 'tailwind-mastery', title: 'Tailwind CSS Mastery', category: 'Web Development', level: 'Beginner', instructor: 'Omar Ali', duration: '4 weeks', price: 29, rating: 4.8, learners: 2540, emoji: '🎨', theme: 'cyan',
    description: 'Design clean, responsive interfaces fast with utility-first CSS. Covers layouts, dark mode and reusable component patterns.',
    modules: ['Utility-first thinking', 'Flexbox and grid layouts', 'Responsive design', 'Dark mode', 'Building a design system'] },
  { slug: 'strapi-cms', title: 'Strapi CMS from Scratch', category: 'Backend', level: 'Beginner', instructor: 'Lina Ahmed', duration: '5 weeks', price: 0, rating: 4.7, learners: 1890, emoji: '🗂️', theme: 'violet',
    description: 'Model content types, manage permissions and expose a REST API your frontend can consume in minutes.',
    modules: ['Install and admin tour', 'Content types and relations', 'Roles and permissions', 'REST API and filters', 'Users and authentication'] },
  { slug: 'node-api', title: 'Node.js REST API Bootcamp', category: 'Backend', level: 'Advanced', instructor: 'David Park', duration: '10 weeks', price: 79, rating: 4.8, learners: 1420, emoji: '🛠️', theme: 'emerald',
    description: 'Design secure, scalable APIs with authentication, validation, testing and production deployment.',
    modules: ['Express fundamentals', 'Database design', 'JWT authentication', 'Testing APIs', 'Production deployment'] },
  { slug: 'nestjs-masterclass', title: 'NestJS API Masterclass', category: 'Backend', level: 'Intermediate', instructor: 'Tariq Rahman', duration: '8 weeks', price: 55, rating: 4.8, learners: 1980, emoji: '🐈', theme: 'pink',
    description: 'Build scalable, well-structured server-side apps with NestJS and TypeScript. Learn modules, dependency injection, validation, JWT authentication and testing.',
    modules: ['Modules, controllers and providers', 'Dependency injection', 'REST API with DTOs and validation', 'Authentication with JWT guards', 'Testing and deployment'] },
  { slug: 'ui-ux-basics', title: 'UI/UX Design Basics', category: 'Design', level: 'Beginner', instructor: 'Maya Chen', duration: '6 weeks', price: 39, rating: 4.6, learners: 2210, emoji: '✏️', theme: 'pink',
    description: 'Learn research, wireframing, prototyping and visual hierarchy to design products people enjoy using.',
    modules: ['Design thinking', 'Wireframing', 'Typography and colour', 'Prototyping', 'Usability testing'] },
  { slug: 'python-data', title: 'Python for Data Analysis', category: 'Data', level: 'Intermediate', instructor: 'Ravi Patel', duration: '7 weeks', price: 59, rating: 4.7, learners: 2760, emoji: '📊', theme: 'amber',
    description: 'Clean, explore and visualize data with pandas and matplotlib, then present insights clearly.',
    modules: ['Python refresher', 'pandas essentials', 'Cleaning messy data', 'Visualization', 'Final analysis project'] },
  { slug: 'react-19', title: 'React 19 in Practice', category: 'Web Development', level: 'Intermediate', instructor: 'Noor Hassan', duration: '6 weeks', price: 45, rating: 4.9, learners: 3380, emoji: '🚀', theme: 'sky',
    description: 'Master the new React 19 features: actions, useActionState, useOptimistic and the use hook, through hands-on exercises.',
    modules: ['What is new in React 19', 'Actions and forms', 'useOptimistic', 'Server components', 'Performance tips'] },
  { slug: 'sql-basics', title: 'SQL for Beginners', category: 'Data', level: 'Beginner', instructor: 'Ethan Brooks', duration: '3 weeks', price: 0, rating: 4.5, learners: 1650, emoji: '🗃️', theme: 'slate',
    description: 'Query, filter and join tables confidently. Perfect first step before backend or data work.',
    modules: ['SELECT basics', 'Filtering and sorting', 'Joins', 'Aggregations', 'Practice database'] },
];

// Adds sample courses that have not been added before. Safe to run on every start:
//  - empty database      -> creates everything
//  - database from an older version -> only adds the new sample courses (e.g. NestJS)
//  - a course you deleted in the admin panel stays deleted (each slug is remembered once handled)
// Runs on every start but only creates sample items it has never created before:
//  - empty database  -> creates everything
//  - older database  -> adds only the new sample courses (for example NestJS)
//  - courses you delete in the admin panel stay deleted
module.exports = async function seed(strapi) {
  const store = strapi.store({ type: 'core', name: 'learnhub-seed' });
  const done = (await store.get({ key: 'slugs' })) || [];
  const todo = COURSES.filter((c) => !done.includes(c.slug));
  if (!todo.length) return;

  strapi.log.info(`Seeding ${todo.length} sample course(s)...`);

  const categoryIds = {};
  for (const name of CATEGORIES) {
    const found = await strapi.documents('api::category.category').findFirst({ filters: { name } });
    const doc =
      found ||
      (await strapi.documents('api::category.category').create({
        data: { name, slug: slugify(name) },
        status: 'published',
      }));
    categoryIds[name] = doc.documentId;
  }

  // created in reverse so "newest first" shows the courses in the order listed above
  for (const { category, ...course } of [...todo].reverse()) {
    const exists = await strapi.documents('api::course.course').findFirst({ filters: { slug: course.slug } });
    if (exists) continue;
    await strapi.documents('api::course.course').create({
      data: { ...course, category: categoryIds[category] },
      status: 'published',
    });
  }

  await store.set({ key: 'slugs', value: COURSES.map((c) => c.slug) });
  strapi.log.info('Seeding done.');
};
