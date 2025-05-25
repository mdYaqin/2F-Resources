import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        images: true, // include all related images
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch all projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { images = [], ...projectData } = body;

    // Input validation
    if (!projectData.title || !projectData.description) {
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

    // Validate exactly one preview image
    const previewCount = images.filter((img) => img.isPreview).length;
    if (previewCount !== 1) {
      return NextResponse.json(
        { error: "Exactly one preview image is required" },
        { status: 400 }
      );
    }

    // Use transaction for atomic operation
    const newProject = await prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          ...projectData,
          images: {
            create: images.map((img) => ({
              url: img.url,
              publicId: img.publicId,
              isPreview: img.isPreview,
            })),
          },
        },
        include: { images: true },
      });
      return project;
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Project creation error:", error);

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Project with similar attributes already exists" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
