const { Client } = require('pg');

const DATABASE_URL = 'postgresql://postgres.bhksbhlpaihztieupsgk:Orlandeli2024Bank@aws-0-us-west-2.pooler.supabase.com:5432/postgres';

async function main() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database.');

    // In PostgreSQL, Strapi 5 usually stores admin permissions in "admin_permissions" table
    const res = await client.query('SELECT id, subject FROM admin_permissions WHERE subject LIKE \'api::%\'');
    console.log(`Found ${res.rows.length} total API permissions.`);

    let deleted = 0;
    // We only have ilustraca0, post-blog, quadrinho
    const validSubjects = ['api::ilustraca0.ilustraca0', 'api::post-blog.post-blog', 'api::quadrinho.quadrinho'];

    for (const row of res.rows) {
      if (!validSubjects.includes(row.subject)) {
        console.log(`Deleting orphaned permission for subject: ${row.subject}`);
        await client.query('DELETE FROM admin_permissions WHERE id = $1', [row.id]);
        deleted++;
      }
    }

    console.log(`Cleanup finished! Deleted ${deleted} orphaned permissions.`);
  } catch (err) {
    console.error('Error during cleanup:', err);
  } finally {
    await client.end();
    process.exit(0);
  }
}

main();
