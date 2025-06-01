"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { Project, Image as ImageType } from "@/types";
import Pageloader from "@/components/Pageloader";
import AdminNavbar from "@/components/admin/AdminNavbar";
import ProjectList from "@/components/admin/ProjectList";
import ProjectModal from "@/components/admin/ProjectModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { useProjects } from "@/components/hooks/useProjects";
import UserManagement from "@/components/admin/UserManagement";

export default function ProjectAdmin() {
  useEffect(() => {
    // Add CSS for text truncation
    const style = document.createElement("style");
    style.textContent = `
      .text-truncate-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const { data: session, status } = useSession();
  const {
    projects,
    featuredCount,
    loading,
    saving,
    error,
    setError,
    saveProject,
    deleteProject,
  } = useProjects();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(
    null
  );
  const [images, setImages] = useState<ImageType[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<ImageType[]>([]);
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    // console.log(images, "images");
  });
  const handleProjectChange = (updates: Partial<Project>) => {
    setCurrentProject((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const handleImageAdd = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    const isFirst = images.length === 0;

    const newImage: ImageType = {
      id: crypto.randomUUID(),
      url: previewUrl,
      isPreview: isFirst,
      file,
    };

    setImages((prev) => [...prev, newImage]);
  };

  const handlePreviewSet = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPreview: img.id === imageId,
      }))
    );
  };

  const handleImageRemove = (imageId: string) => {
    // Get current snapshot of images
    const currentImages = [...images];
    const imageToRemove = currentImages.find((img) => img.id === imageId);

    if (!imageToRemove) return;

    // Update images state
    const remainingImages = currentImages.filter((img) => img.id !== imageId);
    const updatedImages =
      imageToRemove.isPreview && remainingImages.length > 0
        ? remainingImages.map((img, index) => ({
            ...img,
            isPreview: index === 0,
          }))
        : remainingImages;

    setImages(updatedImages);

    // Update imagesToDelete if needed
    if (imageToRemove.id && !imageToRemove.file) {
      console.log(imagesToDelete, "delete", currentProject);
      setImagesToDelete((prev) =>
        prev.some((img) => img.id === imageId) ? prev : [...prev, imageToRemove]
      );
    }
  };

  const handleSubmit = async () => {
    if (!currentProject) return;

    // Validation
    if (!currentProject.title?.trim() || !currentProject.description?.trim()) {
      setError("Title and description are required");
      return;
    }

    const previewCount = images.filter((img) => img.isPreview).length;
    if (previewCount !== 1) {
      setError("Each project must have exactly one preview image");
      return;
    }

    if (currentProject.isFeatured && featuredCount >= 4 && !currentProject.id) {
      setError("Maximum 4 featured projects allowed");
      return;
    }

    for (const image of images) {
      if (image.file) {
        if (!image.file.type.startsWith("image/")) {
          setError("Only image files are allowed");
          return;
        }
        if (image.file.size > 5 * 1024 * 1024) {
          setError("Image size should be less than 5MB");
          return;
        }
      }
    }

    // Close modal and reset form immediately
    setShowModal(false);
    const projectToSave = { ...currentProject };
    const imagesToSave = [...images];
    setCurrentProject(null);
    setImages([]);

    await saveProject(
      projectToSave,
      imagesToSave,
      !!currentProject.id,
      imagesToDelete
    );
  };

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    setProjectToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    setShowDeleteModal(false);
    const idToDelete = projectToDelete;
    setProjectToDelete(null);

    await deleteProject(idToDelete);
  };

  const openEditModal = (project: Project) => {
    setCurrentProject(project);
    setImages(project.images || []);
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentProject({
      title: "",
      description: "",
      summary: "",
      location: "",
      jobScope: "",
      style: "",
      timeline: "",
      isFeatured: false,
      featureTitle: "",
      projectValue: "",
      tags: [],
    });
    setImages([]);
    setShowModal(true);
  };

  return (
    <>
      <AdminNavbar />
      <Container className="py-5 position-relative">
        {saving && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pageloader />
          </div>
        )}

        {status === "loading" ? (
          <Pageloader />
        ) : session?.user ? (
          <>
            <h1>Welcome, {session.user.name}</h1>
            <p>You have successfully accessed the admin dashboard.</p>
          </>
        ) : (
          redirect("/admin/login?callbackUrl=/admin/dashboard")
        )}

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => k && setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="list" title="Project List">
            <ProjectList
              projects={projects}
              loading={loading}
              error={error}
              onAddProject={openAddModal}
              onEditProject={openEditModal}
              onDeleteProject={handleDelete}
            />
          </Tab>

          <Tab eventKey="enquiries" title="Enquiries">
            <p>Enquiries/Appointments tab content will go here.</p>
          </Tab>

          <Tab eventKey="users" title="User Management">
            <UserManagement />
          </Tab>
        </Tabs>

        <DeleteConfirmModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />

        <ProjectModal
          show={showModal}
          project={currentProject}
          images={images}
          featuredCount={featuredCount}
          saving={saving}
          onHide={() => setShowModal(false)}
          onProjectChange={handleProjectChange}
          onImageAdd={handleImageAdd}
          onPreviewSet={handlePreviewSet}
          onImageRemove={handleImageRemove}
          onSubmit={handleSubmit}
          onError={setError}
        />
      </Container>
    </>
  );
}
