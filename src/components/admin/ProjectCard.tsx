import { Card, Button } from "react-bootstrap";
import Image from "next/image";
import { Project } from "@/types";

export default function ProjectCard({ project, onEdit, onDelete }) {
  const previewImage = project.images.find((img) => img.isPreview);

  return (
    <Card>
      {previewImage && (
        <div style={{ height: "200px", position: "relative" }}>
          <Image
            src={previewImage.url}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>{project.summary}</Card.Text>
        <div className="d-flex justify-content-between">
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
  );
}
