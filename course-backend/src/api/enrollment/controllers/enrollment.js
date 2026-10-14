const { createCoreController } = require('@strapi/strapi').factories;

const UID = 'api::enrollment.enrollment';

module.exports = createCoreController(UID, ({ strapi }) => ({
  // GET /api/enrollments -> only the logged-in user's enrollments
  async find(ctx) {
    const data = await strapi.documents(UID).findMany({
      filters: { userId: ctx.state.user.id },
      limit: 100,
    });
    return { data };
  },

  // POST /api/enrollments  body: { data: { courseSlug } }
  async create(ctx) {
    const courseSlug = ctx.request.body?.data?.courseSlug;
    if (!courseSlug) return ctx.badRequest('courseSlug is required');

    const userId = ctx.state.user.id;
    const [exists] = await strapi.documents(UID).findMany({ filters: { userId, courseSlug }, limit: 1 });
    if (exists) return ctx.badRequest('Already enrolled');

    const course = await strapi.documents('api::course.course').findFirst({ filters: { slug: courseSlug } });
    if (!course) return ctx.notFound('Course not found');

    const data = await strapi.documents(UID).create({ data: { courseSlug, userId, completed: [] } });
    return { data };
  },

  // PUT /api/enrollments/:id  body: { data: { completed: ["0-0", "0-1"] } }
  async update(ctx) {
    const { id } = ctx.params; // documentId
    const completed = ctx.request.body?.data?.completed;
    if (!Array.isArray(completed) || !completed.every((k) => typeof k === 'string')) {
      return ctx.badRequest('completed must be an array of strings');
    }

    const current = await strapi.documents(UID).findOne({ documentId: id });
    if (!current || current.userId !== ctx.state.user.id) return ctx.forbidden();

    const data = await strapi.documents(UID).update({ documentId: id, data: { completed } });
    return { data };
  },
}));
