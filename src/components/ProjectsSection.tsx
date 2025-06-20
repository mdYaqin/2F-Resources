"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col, Tab, Nav, Alert } from "react-bootstrap";

interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  location: string;
  featureTitle: string;
  tags: string[];
  images: {
    url: string;
    isPreview: boolean;
  }[];
}

export default function ProjectsSection({
  projects = [],
}: {
  projects?: Project[];
}) {
  const [activeKey, setActiveKey] = useState(
    projects.length > 0 ? `project-${projects[0].id}` : ""
  );

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (projects.length === 0)
    return <Alert variant="info">No featured projects available</Alert>;

  return (
    <Container fluid className="project py-5">
      <Container>
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
          <h4 className="section-title">Our Projects</h4>
          <h1 className="display-5 mb-4">Featured Projects</h1>
        </div>

        <Tab.Container
          activeKey={activeKey}
          onSelect={(k) => k && setActiveKey(k)}
        >
          <Row className="g-4">
            <Col xl={3}>
              <Nav variant="pills" className="flex-column">
                {projects.map((project) => (
                  <Nav.Item key={project.id} className="mb-3">
                    <Nav.Link
                      eventKey={`project-${project.id}`}
                      className="text-start p-3"
                    >
                      <h3 className="m-0">{project.title}</h3>
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>

            <Col xl={9}>
              <Tab.Content>
                {projects.map((project) => {
                  const previewImage = project.images.find(
                    (img) => img.isPreview
                  );
                  return (
                    <Tab.Pane
                      key={project.id}
                      eventKey={`project-${project.id}`}
                    >
                      <Row className="g-4">
                        <Col lg={6} style={{ minHeight: "350px" }}>
                          {previewImage && (
                            <div
                              className="position-relative w-100"
                              style={{ maxWidth: "440px" }}
                            >
                              <Image
                                src={previewImage.url}
                                alt={project.title}
                                width={440}
                                height={440}
                                className="img-fluid object-fit-cover"
                                style={{ height: "auto", aspectRatio: "1 / 1" }}
                                priority
                              />
                            </div>
                          )}
                        </Col>
                        <Col lg={6}>
                          <h1 className="mb-3">{project.featureTitle}</h1>
                          <p className="mb-4">{project.summary}</p>
                          {project.tags.map((tag, index) => (
                            <p key={index}>
                              <i className="fa fa-check text-primary me-3"></i>
                              {tag}
                            </p>
                          ))}
                          <Link
                            href={`/projects/${project.id}`}
                            className="btn btn-primary py-3 px-5 mt-3"
                          >
                            View Project
                          </Link>
                        </Col>
                      </Row>
                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </Container>
  );
}
