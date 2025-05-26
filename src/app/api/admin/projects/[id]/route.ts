import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} from "@/lib/cloudinary";
import { Prisma } from "@prisma/client";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id: projectId } = context.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { images: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const projectId = params.id;

  try {
    // 1. Validate project ID
    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // 2. Parse form data
    const formData = await request.formData();
    const projectData = {
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

    // 3. Validate required fields
    if (!projectData.title?.trim() || !projectData.description?.trim()) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // 4. Get existing project
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
      include: { images: true },
    });

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 5. Check featured project limit if project is being featured
    if (projectData.isFeatured && !existingProject.isFeatured) {
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

    // 6. Handle image updates
    const newImages = formData.getAll("images") as File[];
    const imagesToDelete = JSON.parse(
      (formData.get("imagesToDelete") as string) || "[]"
    ) as string[];

    console.log(imagesToDelete, "delete");

    // 7. If no image changes, do a simple update
    if (newImages.length === 0 && imagesToDelete.length === 0) {
      const updatedProject = await prisma.project.update({
        where: { id: projectId },
        data: projectData,
        include: { images: true },
      });
      return NextResponse.json(updatedProject);
    }

    // 8. Handle image updates with transaction
    const result = await prisma.$transaction(
      async (tx) => {
        // 8.1 Delete removed images
        if (imagesToDelete.length > 0) {
          // Get images to delete
          const imagesToRemove = existingProject.images.filter((img) =>
            imagesToDelete.includes(img.id)
          );

          // Delete from Cloudinary
          await Promise.all(
            imagesToRemove.map(async (image) => {
              try {
                if (image.publicId) {
                  await deleteImageFromCloudinary(image.publicId);
                }
              } catch (error) {
                console.error(
                  `Failed to delete image from Cloudinary: ${image.publicId}`,
                  error
                );
              }
            })
          );

          // Delete from database
          await tx.image.deleteMany({
            where: {
              id: {
                in: imagesToDelete,
              },
            },
          });
        }

        // 8.2 Upload new images
        const newImageRecords = [];
        for (const file of newImages) {
          try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const { url, public_id } = await uploadImageToCloudinary(buffer);

            newImageRecords.push({
              url,
              publicId: public_id,
              isPreview: false, // We'll set preview after all uploads
            });
          } catch (error) {
            console.error("Failed to upload image:", error);
            throw new Error(
              `Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}`
            );
          }
        }

        // 8.3 Update project with new data
        const updatedProject = await tx.project.update({
          where: { id: projectId },
          data: {
            ...projectData,
            images: {
              create: newImageRecords,
            },
          },
          include: { images: true },
        });

        // 8.4 Set first image as preview if needed
        if (
          newImageRecords.length > 0 &&
          !updatedProject.images.some((img) => img.isPreview)
        ) {
          await tx.image.update({
            where: { id: updatedProject.images[0].id },
            data: { isPreview: true },
          });
          updatedProject.images[0].isPreview = true;
        }

        return updatedProject;
      },
      {
        timeout: 30000, // Increased timeout
        maxWait: 30000,
      }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating project:", error);

    // Handle specific error cases
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Project with similar attributes already exists" },
          { status: 400 }
        );
      }
      if (error.code === "P2028") {
        return NextResponse.json(
          { error: "Operation timed out. Please try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id: projectId } = context.params;

  try {
    // Get project with images first to handle cleanup
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { images: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Use transaction with increased timeout
    await prisma.$transaction(
      async (tx) => {
        // Delete all associated images from Cloudinary first
        const deletePromises = project.images.map(async (image) => {
          try {
            await deleteImageFromCloudinary(image.publicId);
          } catch (error) {
            console.error(
              `Failed to delete image from Cloudinary: ${image.publicId}`,
              error
            );
          }
        });

        // Wait for all Cloudinary deletions to complete
        await Promise.all(deletePromises);

        // Delete all images from database
        await tx.image.deleteMany({
          where: { projectId: projectId },
        });

        // Finally delete the project
        await tx.project.delete({
          where: { id: projectId },
        });
      },
      {
        timeout: 10000,
        maxWait: 10000,
      }
    );

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
      if (error.code === "P2028") {
        return NextResponse.json(
          { error: "Operation timed out. Please try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
