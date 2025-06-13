"use client";
import { Form, Row, Col } from "react-bootstrap";
import { Project } from "@/types";
import { useState } from "react";
import FieldLabelWithTooltip from "./FieldLabelWithTooltip";

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

  const [wasInitiallyFeatured] = useState(project.isFeatured);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    onProjectChange({ tags });
  };

  const handleFeaturedChange = (checked: boolean) => {
    if (checked && featuredCount >= 4 && !wasInitiallyFeatured) {
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
            <Form.Label>
              <FieldLabelWithTooltip field="title" label="Title" />
            </Form.Label>
            <Form.Control
              name="title"
              value={project.title || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FieldLabelWithTooltip
                field="featureTitle"
                label="Feature Title"
              />
            </Form.Label>
            <Form.Control
              name="featureTitle"
              value={project.featureTitle || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FieldLabelWithTooltip field="description" label="Description" />
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={project.description || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FieldLabelWithTooltip field="summary" label="Summary" />
            </Form.Label>
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
            <Form.Label>
              <FieldLabelWithTooltip field="location" label="Location" />
            </Form.Label>
            <Form.Control
              name="location"
              value={project.location || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FieldLabelWithTooltip field="jobScope" label="Job Scope" />
            </Form.Label>
            <Form.Control
              name="jobScope"
              value={project.jobScope || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FieldLabelWithTooltip field="style" label="Style" />
            </Form.Label>
            <Form.Control
              name="style"
              value={project.style || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FieldLabelWithTooltip field="timeline" label="Timeline" />
            </Form.Label>
            <Form.Control
              name="timeline"
              value={project.timeline || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FieldLabelWithTooltip
                field="projectValue"
                label="Project Value"
              />
            </Form.Label>
            <Form.Control
              name="projectValue"
              value={project.projectValue || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FieldLabelWithTooltip
                field="tags"
                label="Tags (comma separated)"
              />
            </Form.Label>
            <Form.Control
              name="tags"
              value={project.tags?.join(", ") || ""}
              onChange={handleTagsChange}
            />
          </Form.Group>

          <Form.Check
            type="switch"
            id="featured-switch"
            label={
              <FieldLabelWithTooltip
                field="isFeatured"
                label="Featured Project"
              />
            }
            checked={project.isFeatured || false}
            disabled={featuredCount >= 4 && !wasInitiallyFeatured}
            onChange={(e) => handleFeaturedChange(e.target.checked)}
          />
          {featuredCount >= 4 && !wasInitiallyFeatured ? (
            <p className="text-danger">(Maximum 4 featured projects allowed)</p>
          ) : null}
        </Col>
      </Row>
    </Form>
  );
}
