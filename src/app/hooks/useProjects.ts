import { useState, useEffect } from "react";
import { Project, Image as ImageType } from "@/types";

export default function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(
    null
  );
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/admin/projects");
        const data = await res.json();
        setProjects(data);
        setFeaturedCount(data.filter((p: Project) => p.isFeatured).length);
      } catch {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        throw new Error("Failed to delete");
      }
    } catch {
      setError("Failed to delete project");
    }
  };

  return {
    projects,
    featuredCount,
    loading,
    error,
    showModal,
    setShowModal,
    currentProject,
    setCurrentProject,
    images,
    setImages,
    handleDelete,
  };
}
