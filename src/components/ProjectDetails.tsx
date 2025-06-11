"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { Container, Row, Col, Carousel, Alert } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import Pageloader from "@/components/Pageloader";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  jobScope: string;
  style: string;
  timeline: string;
  featureTitle: string;
  projectValue: string;
  images: {
    url: string;
    isPreview: boolean;
  }[];
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            return notFound();
          }
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <Pageloader />;
  }

  if (error) {
    return (
      <div className="py-5">
        <Alert variant="danger">
          {error}
          <div className="mt-3">
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </Alert>
      </div>
    );
  }

  if (!project) {
    return notFound();
  }

  return (
    <>
      <div className="project py-5">
        <Container>
          <div
            className="text-center mx-auto mb-5"
            data-aos="fade-up"
            data-aos-delay="100"
            style={{ maxWidth: "600px" }}
          >
            <h4 className="section-title">Project Details</h4>
            <h1 className="display-5 mb-4">{project.title}</h1>
          </div>

          <Row
            className="g-5 align-items-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {/* Carousel */}
            <Col lg={6}>
              <Carousel fade interval={3000}>
                {project.images.map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "500px",
                      }}
                    >
                      <Image
                        src={img.url}
                        alt={`${project.title} - Image ${idx + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={idx === 0}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            {/* Text Content */}
            <Col lg={6}>
              <h2 className="mb-3">{project.featureTitle}</h2>

              <ul className="list-unstyled mb-4">
                <li>
                  <strong>Job Scope:</strong> {project.jobScope}
                </li>
                <li>
                  <strong>Style:</strong> {project.style}
                </li>
                <li>
                  <strong>Timeline:</strong> {project.timeline}
                </li>
                <li>
                  <strong>Location:</strong> {project.location}
                </li>
                <li>
                  <strong>Budget:</strong> {project.projectValue}
                </li>
              </ul>

              <p>{project.description}</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
