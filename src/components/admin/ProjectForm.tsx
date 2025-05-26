"use client";
import { Form, Row, Col } from "react-bootstrap";
import { Project } from "@/types";

interface ProjectFormProps {
  project: Partial<Project>;
  featuredCount: number;
  onProjectChange: (updates: Partial<Project>) => void;
  onError: (error: string) => void;
}

export default function ProjectForm({
  project,
  featuredCount,
  onProjectChange,
  onError,
}: ProjectFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onProjectChange({ [name]: value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    onProjectChange({ tags });
  };

  const handleFeaturedChange = (checked: boolean) => {
    if (checked && featuredCount >= 4 && !project.isFeatured) {
      onError("Maximum 4 featured projects allowed");
      return;
    }
    onProjectChange({ isFeatured: checked });
  };

  return (
    <Form>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={project.title || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Feature Title</Form.Label>
            <Form.Control
              name="featureTitle"
              value={project.featureTitle || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={project.description || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="summary"
              value={project.summary || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              value={project.location || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Scope</Form.Label>
            <Form.Control
              name="jobScope"
              value={project.jobScope || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Style</Form.Label>
            <Form.Control
              name="style"
              value={project.style || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Timeline</Form.Label>
            <Form.Control
              name="timeline"
              value={project.timeline || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Value</Form.Label>
            <Form.Control
              name="projectValue"
              value={project.projectValue || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags (comma separated)</Form.Label>
            <Form.Control
              name="tags"
              value={project.tags?.join(", ") || ""}
              onChange={handleTagsChange}
            />
          </Form.Group>

          <Form.Check
            type="switch"
            id="featured-switch"
            label="Featured Project"
            checked={project.isFeatured || false}
            onChange={(e) => handleFeaturedChange(e.target.checked)}
          />
        </Col>
      </Row>
    </Form>
  );
}
