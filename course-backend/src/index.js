'use strict';

const seed = require('./seed');

// API permissions applied automatically on every start, so nothing has to be clicked in the admin panel.
const PERMISSIONS = {
  public: [
    'api::course.course.find',
    'api::course.course.findOne',
    'api::category.category.find',
    'api::category.category.findOne',
    'api::subscriber.subscriber.create',
  ],
  authenticated: [
    'api::enrollment.enrollment.find',
    'api::enrollment.enrollment.create',
    'api::enrollment.enrollment.update',
  ],
};

async function grant(strapi, roleType, actions) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: roleType } });
  if (!role) return;

  for (const action of actions) {
    const found = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: role.id } });
    if (!found) {
      await strapi.db.query('plugin::users-permissions.permission').create({ data: { action, role: role.id } });
    }
  }
}

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    for (const [roleType, actions] of Object.entries(PERMISSIONS)) {
      await grant(strapi, roleType, actions);
    }
    await seed(strapi);
  },
};
