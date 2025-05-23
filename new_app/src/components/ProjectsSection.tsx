"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import projects from "@/data/projects.json";

export default function ProjectsSection() {
  const [activeKey, setActiveKey] = useState<string>("project-1");
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Container fluid className="project py-5">
      <Container>
        <div
          className="text-center mx-auto mb-5"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ maxWidth: "600px" }}
        >
          <h4 className="section-featureTitle">Our Projects</h4>
          <h1 className="display-5 mb-4">
            Visit Our Latest Projects And Our Innovative Works
          </h1>
        </div>

        <Tab.Container
          activeKey={activeKey}
          onSelect={(key: string | null) => key && setActiveKey(key)}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Row className="g-4">
            <Col lg={4}>
              <Nav variant="pills" className="flex-column">
                {projects.map((project) => (
                  <Nav.Item key={project.id} className="mb-3">
                    <Nav.Link
                      eventKey={`project-${project.id}`}
                      className="text-start p-4"
                    >
                      <h3 className="m-0">{`0${project.id}. ${project.title}`}</h3>
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>

            <Col lg={8}>
              <Tab.Content>
                {projects.map((project) => (
                  <Tab.Pane key={project.id} eventKey={`project-${project.id}`}>
                    <Row className="g-4">
                      <Col md={6} style={{ minHeight: "350px" }}>
                        <div className="position-relative h-100">
                          <Image
                            src={project.featureImg}
                            alt={`Project ${project.id}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <h1 className="mb-3">{project.featureTitle}</h1>
                        <p className="mb-4">{project.summary}</p>
                        {project.tag.map((feature, i) => (
                          <p key={i}>
                            <i className="fa fa-check text-primary me-3"></i>
                            {feature}
                          </p>
                        ))}
                        <Link
                          href={`/projects/${project.id}`}
                          className="btn btn-primary py-3 px-5 mt-3"
                        >
                          Read More
                        </Link>
                      </Col>
                    </Row>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </Container>
  );
}
