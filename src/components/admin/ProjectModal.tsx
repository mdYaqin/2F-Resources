"use client";
import { Modal, Button } from "react-bootstrap";
import { Project, Image as ImageType } from "@/types";
import ProjectForm from "./ProjectForm";
import ImageUpload from "./ImageUpload";

interface ProjectModalProps {
  show: boolean;
  project: Partial<Project> | null;
  images: ImageType[];
  featuredCount: number;
  saving: boolean;
  onHide: () => void;
  onProjectChange: (updates: Partial<Project>) => void;
  onImageAdd: (file: File) => void;
  onPreviewSet: (imageId: string) => void;
  onImageRemove: (imageId: string) => void;
  onSubmit: () => void;
  onError: (error: string) => void;
}

export default function ProjectModal({
  show,
  project,
  images,
  featuredCount,
  saving,
  onHide,
  onProjectChange,
  onImageAdd,
  onPreviewSet,
  onImageRemove,
  onSubmit,
  onError,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{project.id ? "Edit Project" : "Add Project"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProjectForm
          project={project}
          featuredCount={featuredCount}
          onProjectChange={onProjectChange}
          onError={onError}
        />
        <ImageUpload
          images={images}
          onImageAdd={onImageAdd}
          onPreviewSet={onPreviewSet}
          onImageRemove={onImageRemove}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
