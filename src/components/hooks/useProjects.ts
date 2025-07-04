"use client";
import { useState, useEffect } from "react";
import { Image, Project } from "@/types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      setProjects(data);
      setFeaturedCount(data.filter((p: Project) => p.isFeatured).length);
    } catch (error) {
      console.error("Failed to load projects:", error);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async (
    projectData: any,
    images: Image[],
    isEdit: boolean,
    imagesToDelete: Image[]
  ) => {
    setSaving(true);
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(projectData).forEach(([key, value]) => {
        if (key === "tags") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "isFeatured" && typeof value === "boolean") {
          formData.append(key, value.toString());
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value)); // Safe coercion
        }
      });

      // Handle images
      const existingImages = images.filter((img) => !img.file && !img._removed);
      // const newImages = images.filter((img) => img.file instanceof File);
      // const imagesToDelete = images
      //   .filter((img) => !img.file && img.id && img._removed)
      //   .map((img) => img.id);

      if (existingImages.length > 0) {
        formData.append(
          "existingImages",
          JSON.stringify(
            existingImages.map((img) => ({
              id: img.id,
              url: img.url,
              isPreview: img.isPreview,
            }))
          )
        );
      }

      console.log(images);
      let imageIndex = 0;
      images.forEach((image) => {
        if (image.file instanceof File) {
          formData.append(`images[${imageIndex}]`, image.file, image.file.name);
          if (image.isPreview) {
            // Use temporary ID for new preview images
            formData.append("previewImageId", `new-${imageIndex}`);
          }
          imageIndex++;
        } else {
          if (image.isPreview) {
            // Use temporary ID for new preview images
            formData.append("previewImageId", image.id!);
          }
        }
      });

      if (imagesToDelete.length > 0) {
        formData.append("imagesToDelete", JSON.stringify(imagesToDelete));
      }

      console.log(formData, "---------------");
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `/api/admin/projects/${projectData.id}`
        : "/api/admin/projects";

      const res = await fetch(url, { method, body: formData });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save project");
      }

      await fetchProjects();
    } catch (error) {
      console.error("Failed to save project:", error);
      setError(
        error instanceof Error ? error.message : "Failed to save project"
      );
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setSaving(true);
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      await fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
      setError("Failed to delete project");
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    featuredCount,
    loading,
    saving,
    error,
    setError,
    saveProject,
    deleteProject,
    fetchProjects,
  };
}
