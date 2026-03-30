import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminExists = await db.user.findUnique({
    where: { email: "admin@padel-krakow.com" },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("change-me-in-production", 10);
    await db.user.create({
      data: {
        email: "admin@padel-krakow.com",
        name: "Admin",
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log("✓ Admin user created");
  }

  // Create author user
  const authorExists = await db.user.findUnique({
    where: { email: "author@padel-krakow.com" },
  });

  if (!authorExists) {
    const hashedPassword = await bcrypt.hash("change-me-in-production", 10);
    await db.user.create({
      data: {
        email: "author@padel-krakow.com",
        name: "Author",
        password: hashedPassword,
        role: "author",
      },
    });
    console.log("✓ Author user created");
  }

  console.log("\n✅ Database seeded successfully!");
  console.log("\nDefault credentials:");
  console.log("Admin Email: admin@padel-krakow.com");
  console.log("Admin Password: change-me-in-production");
  console.log("\nAuthor Email: author@padel-krakow.com");
  console.log("Author Password: change-me-in-production");
  console.log("\n⚠️  IMPORTANT: Change these passwords immediately in production!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
