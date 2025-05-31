import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} from "@/lib/cloudinary";
import { Prisma } from "@prisma/client";

import type { Project, Image } from "@prisma/client";

interface ProjectResponse extends Project {
  images: Image[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: projectId } = params;

  // Input validation
  if (!projectId) {
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 }
    );
  }

  try {
    console.log(`Fetching project with ID: ${projectId}`);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { images: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Project data:", project);
    }

    return NextResponse.json<ProjectResponse>(project);
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

    const previewImageId = formData.get("previewImageId") as string;

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
    const newImages: File[] = [];
    let index = 0;
    while (true) {
      const file = formData.get(`images[${index}]`) as File | null;
      if (!file) break;
      newImages.push(file);
      index++;
    }

    const imagesToDelete = JSON.parse(
      (formData.get("imagesToDelete") as string) || "[]"
    ) as string[];

    console.log(existingProject, "-------Existing Project------");

    // Determine if preview image has changed
    const previewImageChanged = existingProject.images.some(
      (image) => image.isPreview && image.id !== previewImageId
    );

    console.log("Preview image changed:", previewImageChanged);

    console.log(previewImageChanged, "------image preview------");
    // 7. If no image changes and its preview status, do a simple update
    if (
      newImages.length === 0 &&
      imagesToDelete.length === 0 &&
      !previewImageChanged
    ) {
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
            imagesToDelete.some((delImg) => delImg.id === img.id)
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

          // Extract just the IDs for Prisma deleteMany
          const imageIdsToDelete = imagesToDelete.map((img) => img.id);

          // Delete from database
          await tx.image.deleteMany({
            where: {
              id: {
                in: imageIdsToDelete,
              },
            },
          });
        }

        console.log("_____________-------_________------------------");
        // 8.2 Upload new images
        const newImageRecords = [];
        for (let i = 0; i < newImages.length; i++) {
          const file = newImages[i];
          try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const { url, public_id } = await uploadImageToCloudinary(buffer);

            // Don't set isPreview here yet - we'll handle it after
            newImageRecords.push({
              url,
              publicId: public_id,
              isPreview: false, // Set to false initially
            });
          } catch (error) {
            console.error("Failed to upload image:", error);
            throw new Error(
              `Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}`
            );
          }
        }

        // 8.3 Update project with new data and add new images
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

        // 8.4 Handle preview image selection
        // First, reset ALL images' isPreview to false
        await tx.image.updateMany({
          where: { projectId: projectId },
          data: { isPreview: false },
        });

        console.log("-------------", previewImageId, "------", newImageRecords);

        // Then set the correct preview image
        if (previewImageId) {
          if (previewImageId.startsWith("new-")) {
            // Preview is one of the new images
            const newImageIndex = parseInt(previewImageId.split("-")[1]);

            // Get the newly uploaded images by finding images with URLs that match our new records
            const newlyCreatedImages = updatedProject.images.filter((img) =>
              newImageRecords.some((record) => record.url === img.url)
            );

            if (newlyCreatedImages[newImageIndex]) {
              await tx.image.update({
                where: { id: newlyCreatedImages[newImageIndex].id },
                data: { isPreview: true },
              });
            }
          } else {
            // Preview is an existing image - directly update by ID
            try {
              await tx.image.update({
                where: { id: previewImageId },
                data: { isPreview: true },
              });
            } catch (error) {
              console.error("Failed to set existing image as preview:", error);
              // Fallback to first image if the specified image doesn't exist
              const firstImage = updatedProject.images[0];
              if (firstImage) {
                await tx.image.update({
                  where: { id: firstImage.id },
                  data: { isPreview: true },
                });
              }
            }
          }
        } else {
          // No specific preview selected, set first available image as preview
          const firstImage = updatedProject.images[0];
          if (firstImage) {
            await tx.image.update({
              where: { id: firstImage.id },
              data: { isPreview: true },
            });
          }
        }

        // 8.5 Return the final updated project with correct preview status
        const finalProject = await tx.project.findUnique({
          where: { id: projectId },
          include: { images: true },
        });

        return finalProject;
      },
      {
        timeout: 30000,
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
  request: NextRequest,
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
