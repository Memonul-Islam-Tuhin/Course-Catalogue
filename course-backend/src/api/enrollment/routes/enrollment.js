const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::enrollment.enrollment', { only: ['find', 'create', 'update'] });
