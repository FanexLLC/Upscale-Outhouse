import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Default admin credentials - CHANGE THESE IN PRODUCTION
  const email = process.env.ADMIN_EMAIL || "admin@upscaleouthouse.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeThisPassword123!";
  const name = process.env.ADMIN_NAME || "Admin";

  console.log("Creating admin user...");

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 12);

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`User with email ${email} already exists. Updating password...`);
    await prisma.user.update({
      where: { email },
      data: { passwordHash, name },
    });
    console.log("Admin user password updated successfully!");
  } else {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: "ADMIN",
      },
    });
    console.log("Admin user created successfully!");
  }

  console.log("\n========================================");
  console.log("Admin Login Credentials:");
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log("========================================\n");
  console.log("IMPORTANT: Change these credentials in production!");
}

main()
  .catch((e) => {
    console.error("Error seeding admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
