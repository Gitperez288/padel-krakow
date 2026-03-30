const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const db = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminExists = await db.user.findUnique({
    where: { email: 'admin@padel-krakow.com' },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('change-me-in-production', 10);
    await db.user.create({
      data: {
        email: 'admin@padel-krakow.com',
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
    where: { email: 'author@padel-krakow.com' },
  });

  if (!authorExists) {
    const hashedPassword = await bcrypt.hash('change-me-in-production', 10);
    await db.user.create({
      data: {
        email: 'author@padel-krakow.com',
        name: 'Author',
        password: hashedPassword,
        role: 'author',
      },
    });
    console.log('✓ Author user created');
  } else {
    console.log('✓ Author user already exists');
  }

  console.log('\n✅ Database seeded successfully!');
  console.log('\nDefault credentials:');
  console.log('Admin Email: admin@padel-krakow.com');
  console.log('Admin Password: change-me-in-production');
  console.log('\nAuthor Email: author@padel-krakow.com');
  console.log('Author Password: change-me-in-production');
  console.log('\n⚠️  IMPORTANT: Change these passwords immediately in production!');
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
