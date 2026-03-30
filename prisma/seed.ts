import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

// Default admin credentials - OVERRIDE IN PRODUCTION
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "change-me-in-production";
const AUTHOR_EMAIL = process.env.AUTHOR_EMAIL || "author@example.com";
const AUTHOR_PASSWORD = process.env.AUTHOR_PASSWORD || "change-me-in-production";

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminExists = await db.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await db.user.create({
      data: {
        email: ADMIN_EMAIL,
        name: "Admin",
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log("✓ Admin user created");
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
        name: "Author",
        password: hashedPassword,
        role: "author",
      },
    });
    console.log("✓ Author user created");
  }

  console.log("\n✅ Database seeded successfully!");
  console.log("ℹ️  For security, default credentials are configured via environment variables.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
