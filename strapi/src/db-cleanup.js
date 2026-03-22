const { createStrapi } = require('@strapi/strapi');

console.log('Starting DB cleanup script...');

createStrapi().start().then(async app => {
  try {
    const permissions = await app.db.query('admin::permission').findMany();
    let deleted = 0;

    for (const perm of permissions) {
      if (perm.subject && perm.subject.startsWith('api::')) {
        const uid = perm.subject;
        const contentType = app.contentType(uid);
        if (!contentType) {
          console.log(`[CLEANUP] Deleting orphaned permission for missing content-type: ${uid}`);
          await app.db.query('admin::permission').delete({ where: { id: perm.id } });
          deleted++;
        }
      }
    }

    console.log(`Cleanup finished! Deleted ${deleted} orphaned permissions.`);
  } catch (err) {
    console.error('Error during cleanup:', err);
  } finally {
    process.exit(0);
  }
}).catch(err => {
  console.error('Failed to start Strapi context:', err);
  process.exit(1);
});
