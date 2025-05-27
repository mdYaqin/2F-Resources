import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

interface ProjectData {
  title: string;
  description: string;
  summary: string;
  location: string;
  jobScope: string;
  style: string;
  timeline: string;
  isFeatured: boolean;
  featureTitle: string;
  projectValue: string;
  tags: string[];
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch all projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const projectData: ProjectData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      summary: formData.get("summary") as string,
      location: formData.get("location") as string,
      jobScope: formData.get("jobScope") as string,
      style: formData.get("style") as string,
      timeline: formData.get("timeline") as string,
      isFeatured: formData.get("isFeatured") === "true",
      featureTitle: formData.get("featureTitle") as string,
      projectValue: formData.get("projectValue") as string,
      tags: JSON.parse(formData.get("tags") as string) as string[],
    };

    // const images = formData.getAll("images") as File[];

    const images: File[] = [];
    let index = 0;
    while (true) {
      const file = formData.get(`images[${index}]`) as File | null;
      if (!file) break;
      images.push(file);
      index++;
    }

    // Input validation
    if (!projectData.title?.trim() || !projectData.description?.trim()) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Check featured project limit
    if (projectData.isFeatured) {
      const featuredCount = await prisma.project.count({
        where: { isFeatured: true },
      });
      if (featuredCount >= 4) {
        return NextResponse.json(
          { error: "Maximum 4 featured projects allowed" },
          { status: 400 }
        );
      }
    }

    // Validate at least one image
    if (images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    // Use transaction for atomic operation
    const newProject = await prisma.$transaction(
      async (tx) => {
        // Upload images to Cloudinary first
        const uploadedImages = await Promise.all(
          images.map(async (file, index) => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const { url, public_id } = await uploadImageToCloudinary(buffer);
            return {
              url,
              publicId: public_id,
              isPreview: index === 0, // First image is preview
            };
          })
        );

        // Create project with images
        const project = await tx.project.create({
          data: {
            ...projectData,
            images: {
              create: uploadedImages,
            },
          },
          include: { images: true },
        });

        return project;
      },
      {
        timeout: 10000, // 10 seconds should be enough for optimized flow
        maxWait: 10000,
      }
    );

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Project creation error:", error);

    // Handle specific error cases
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Project with similar attributes already exists" },
          { status: 400 }
        );
      }
    }

    // Handle Cloudinary errors
    if (error instanceof Error && error.message.includes("Cloudinary")) {
      return NextResponse.json(
        { error: "Failed to upload images" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
