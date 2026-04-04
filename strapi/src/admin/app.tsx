import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['pt-BR'],
    head: {
      favicon: '/icon_Orlandeli.png',
    },
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
