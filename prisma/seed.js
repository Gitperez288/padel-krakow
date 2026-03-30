const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const db = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@padel-krakow.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me-in-production';
const AUTHOR_EMAIL = process.env.AUTHOR_EMAIL || 'author@padel-krakow.com';
const AUTHOR_PASSWORD = process.env.AUTHOR_PASSWORD || 'change-me-in-production';

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminExists = await db.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await db.user.create({
      data: {
        email: ADMIN_EMAIL,
        name: 'Admin',
        password: hashedPassword,
        role: 'admin',
      },
    });
    console.log('✓ Admin user created');
  } else {
    console.log('✓ Admin user already exists');
  }

  // Create author user
  const authorExists = await db.user.findUnique({
    where: { email: AUTHOR_EMAIL },
  });

  if (!authorExists) {
    const hashedPassword = await bcrypt.hash(AUTHOR_PASSWORD, 10);
    await db.user.create({
      data: {
        email: AUTHOR_EMAIL,
        name: 'Gabriele',
        password: hashedPassword,
        role: 'author',
      },
    });
    console.log('✓ Author user created (Gabriele)');
  } else {
    console.log('✓ Author user already exists');
  }

  console.log('\n✅ Database seeded successfully!');
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
