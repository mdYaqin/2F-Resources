import { Row, Col } from "react-bootstrap";
import { Project } from "@/types";
import ProjectCard from "./ProjectCard";
import Pageloader from "@/components/Pageloader";

export default function ProjectList({ loading, projects, onEdit, onDelete }) {
  if (loading) return <Pageloader />;

  return (
    <Row>
      {projects.map((project) => (
        <Col key={project.id} md={6} lg={4} className="mb-4">
          <ProjectCard project={project} onEdit={onEdit} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
}
