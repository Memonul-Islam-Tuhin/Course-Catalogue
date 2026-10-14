const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::subscriber.subscriber', { only: ['create'] });
