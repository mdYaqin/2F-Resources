"use client";
import { Row, Button, Alert } from "react-bootstrap";
import { Project } from "@/types";
import ProjectCard from "@/components/admin/ProjectCard";
import Pageloader from "@/components/Pageloader";

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  error: string;
  onAddProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string | undefined) => void;
}

export default function ProjectList({
  projects,
  loading,
  error,
  onAddProject,
  onEditProject,
  onDeleteProject,
}: ProjectListProps) {
  const sortedProjects = projects.sort((a, b) => {
    // Sort by featured status first (featured projects come first)
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    // Then sort by creation date (newest first)
    return (
      new Date(b.createdAt ?? 0).getTime() -
      new Date(a.createdAt ?? 0).getTime()
    );
  });

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={onAddProject}>Add New Project</Button>
      </div>
      {projects.length === 0 && <Alert variant="info">No Projects</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Pageloader />
      ) : (
        <Row>
          {sortedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEditProject}
              onDelete={onDeleteProject}
            />
          ))}
        </Row>
      )}
    </>
  );
}
