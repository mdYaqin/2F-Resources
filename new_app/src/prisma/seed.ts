import { PrismaClient } from "@prisma/client";
import { uploadFileToGridFS } from "@/lib/mongodb/uploadToGridFS";
import path from "path";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "12345678";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Admin",
        hashedPassword,
        role: "ADMIN",
      },
    });
    console.log("Created admin user:", {
      email: adminEmail,
      password: adminPassword, // Only shown for initial setup
      userId: adminUser.id,
    });
  } else {
    console.log("Admin user already exists:", existingAdmin.email);
  }

  // 2. Seed Project with Images (your existing code)
  const imagePaths = [
    "dining_table.jpg",
    "dining.jpg",
    "hall.jpg",
    "living_room.jpg",
    "kitchen.jpg",
  ];

  const fileIds: string[] = [];

  for (const filename of imagePaths) {
    const filepath = path.join(__dirname, "seed-images", filename);
    const fileId = await uploadFileToGridFS(filename, filepath);
    fileIds.push(fileId);
  }

  // Only create project if it doesn't exist
  const existingProject = await prisma.project.findFirst({
    where: { title: "Cozy Victorian" },
  });

  if (!existingProject) {
    const project = await prisma.project.create({
      data: {
        title: "Cozy Victorian",
        description:
          "The Cozy Victorian project is a celebration of warmth, history, and personal storytelling through design. Inspired by the grandeur and intimacy of Victorian aesthetics, this home is intentionally filled with layered textures, intricate detailing, and an eclectic mix of beloved treasures. Every corner is thoughtfully curated to evoke nostalgia and personal connections.",
        location: "Woodlands",
        consultant: "Warsiling Team",
        jobScope: "Whole Unit",
        style: "White Victorian",
        timeline: "Just 10 Weeks",
        images: {
          create: fileIds.map((fileId) => ({
            fileId,
          })),
        },
      },
    });
    console.log("Seeded project:", project.title);
  } else {
    console.log("Project already exists:", existingProject.title);
  }
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
