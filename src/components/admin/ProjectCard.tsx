"use client";
import { Card, Col, Button } from "react-bootstrap";
import Image from "next/image";
import { Project, Image as ImageType } from "@/types";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string | undefined) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const previewImage = project.images.find((img: ImageType) => img.isPreview);

  return (
    <Col md={6} lg={4} className="mb-4">
      <Card className="h-100">
        <div style={{ height: "200px", position: "relative" }}>
          {previewImage ? (
            <Image
              src={previewImage.url}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center">
              <span className="text-muted">No image</span>
            </div>
          )}
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate">{project.title}</Card.Title>
          <Card.Text className="flex-grow-1 text-truncate-2">
            {project.summary}
          </Card.Text>
          <div className="d-flex justify-content-between mt-auto">
            <Button variant="primary" size="sm" onClick={() => onEdit(project)}>
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(project.id)}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
        <Card.Footer>
          <small className={project.isFeatured ? "text-success" : "text-muted"}>
            {project.isFeatured ? "Featured" : "Regular"}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
}
