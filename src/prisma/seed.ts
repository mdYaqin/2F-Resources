// import { PrismaClient } from "@prisma/client";
// import { uploadImageToCloudinary } from "@/lib/cloudinary";
// import path from "path";
// import fs from "fs/promises";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// async function seed() {
//   // 1. Seed Admin User
//   const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
//   const adminPassword = process.env.ADMIN_PASSWORD || "12345678";
//   const existingAdmin = await prisma.user.findUnique({
//     where: { email: adminEmail },
//   });

//   if (!existingAdmin) {
//     const hashedPassword = await bcrypt.hash(adminPassword, 12);
//     const adminUser = await prisma.user.create({
//       data: {
//         email: adminEmail,
//         name: "Admin",
//         hashedPassword,
//         role: "ADMIN",
//       },
//     });
//     console.log("Created admin user:", {
//       email: adminEmail,
//       password: adminPassword, // Only shown for initial setup
//       userId: adminUser.id,
//     });
//   } else {
//     console.log("Admin user already exists:", existingAdmin.email);
//   }
//   try {
//     const imagePaths = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

//     const imageUrls: string[] = [];

//     for (const filename of imagePaths) {
//       const filepath = path.join(__dirname, "seed-images", filename);
//       const fileBuffer = await fs.readFile(filepath); // <-- read file as Buffer
//       const imageUrl = await uploadImageToCloudinary(fileBuffer);
//       imageUrls.push(String(imageUrl));
//     }

//     const existing = await prisma.project.findFirst({
//       where: { title: "Yishun Kitchen Island – Custom Carpentry Mastery" },
//     });

//     if (existing) {
//       console.log("Project already exists:", existing.title);
//       return;
//     }

//     const project = await prisma.project.create({
//       data: {
//         title: "Yishun Kitchen Island – Custom Carpentry Mastery",
//         description:
//           "We’ve combined architectural precision with timeless design to create functional art. This Yishun kitchen island project showcases our innovative carpentry solutions, blending seamless project management with bespoke craftsmanship—all delivered in just 2 weeks.",
//         summary:
//           "A handcrafted kitchen island featuring premium materials, smart storage, and ergonomic design.",
//         location: "Yishun",
//         jobScope:
//           "Custom Kitchen Island (Design, Material Sourcing, Built-in Storage, Installation)",
//         style: "Contemporary Craftsmanship (Tailored + Functional)",
//         timeline: "2 weeks",
//         projectValue: "SGD $12,000",
//         tags: ["Carpentry", "Kitchen Island", "Custom Built-ins"],
//         featureTitle: "Architectural Carpentry: A 2-Week Island Transformation",
//         images: {
//           create: imageUrls.map((url, index) => ({
//             url,
//             isPreview: index === 0,
//           })),
//         },
//       },
//     });

//     console.log("Project created:", project.title);
//   } catch (e) {
//     console.error("Seeding error:", e);
//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seed();
