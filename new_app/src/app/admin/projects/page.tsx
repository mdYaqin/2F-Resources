"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

import { useSession } from "next-auth/react";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  Modal,
  Tab,
  Tabs,
  Navbar,
} from "react-bootstrap";
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";
import { Project, Image as ImageType } from "@/types";
import Pageloader from "@/components/Pageloader";

export default function ProjectAdmin() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(
    null
  );
  const [images, setImages] = useState<ImageType[]>([]);
  const [activeTab, setActiveTab] = useState("list");

  // Fetch projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/projects");
        const data = await res.json();
        setProjects(data);
        setFeaturedCount(data.filter((p: Project) => p.isFeatured).length);
        setLoading(false);
      } catch (err) {
        setError("Failed to load projects");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentProject((prev) => ({ ...prev, [name]: value }));
  };

  // Handle tags input
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setCurrentProject((prev) => ({ ...prev, tags }));
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const newImage = await res.json();
      setImages((prev) => [...prev, newImage]);
    } catch (err) {
      setError("Failed to upload image");
    }
  };

  // Set preview image
  const setPreviewImage = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPreview: img.id === imageId,
      }))
    );
  };

  // Save project
  const handleSubmit = async () => {
    if (!currentProject) return;

    // Validate exactly one preview image
    const previewCount = images.filter((img) => img.isPreview).length;
    if (previewCount !== 1) {
      setError("Each project must have exactly one preview image");
      return;
    }

    // Validate max 4 featured projects
    if (currentProject.isFeatured && featuredCount >= 4 && !currentProject.id) {
      setError("Maximum 4 featured projects allowed");
      return;
    }

    try {
      const method = currentProject.id ? "PUT" : "POST";
      const url = currentProject.id
        ? `/api/admin/projects/${currentProject.id}`
        : "/api/admin/projects/all";

      const body = {
        ...currentProject,
        images,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.refresh();
        setShowModal(false);
        setCurrentProject(null);
        setImages([]);
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      setError("Failed to save project");
    }
  };

  // Delete project
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (err) {
      setError("Failed to delete project");
    }
  };

  // Open edit modal
  const openEditModal = (project: Project) => {
    setCurrentProject(project);
    setImages(project.images || []);
    setShowModal(true);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/admin/dashboard">Admin Dashboard</Navbar.Brand>
          <div className="ms-auto">
            <LogoutButton />
          </div>
        </Container>
      </Navbar>
      <Container className="py-5">
        {status === "loading" ? (
          <Pageloader />
        ) : session?.user ? (
          <>
            <h1>Welcome, {session.user.name}</h1>
            <p>You have successfully accessed the admin dashboard.</p>
          </>
        ) : (
          redirect("/admin/login?callbackUrl=/admin/dashboard")
        )}

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => k && setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="list" title="Project List">
            <div className="d-flex justify-content-end mb-3">
              <Button
                onClick={() => {
                  setCurrentProject({
                    title: "",
                    description: "",
                    summary: "",
                    location: "",
                    jobScope: "",
                    style: "",
                    timeline: "",
                    isFeatured: false,
                    featureTitle: "",
                    projectValue: "",
                    tags: [],
                  });
                  setImages([]);
                  setShowModal(true);
                }}
              >
                Add New Project
              </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <div>Loading...</div>
            ) : (
              <Row>
                {projects.map((project) => {
                  const previewImage = project.images.find(
                    (img) => img.isPreview
                  );
                  return (
                    <Col key={project.id} md={6} lg={4} className="mb-4">
                      <Card>
                        {previewImage && (
                          <div
                            style={{ height: "200px", position: "relative" }}
                          >
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
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => openEditModal(project)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(project.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card.Body>
                        <Card.Footer>
                          <small
                            className={
                              project.isFeatured ? "text-success" : "text-muted"
                            }
                          >
                            {project.isFeatured ? "Featured" : "Regular"}
                          </small>
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Tab>
        </Tabs>

        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {currentProject?.id ? "Edit Project" : "Add Project"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      value={currentProject?.title || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Feature Title</Form.Label>
                    <Form.Control
                      name="featureTitle"
                      value={currentProject?.featureTitle || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={currentProject?.description || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="summary"
                      value={currentProject?.summary || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      name="location"
                      value={currentProject?.location || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Job Scope</Form.Label>
                    <Form.Control
                      name="jobScope"
                      value={currentProject?.jobScope || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Style</Form.Label>
                    <Form.Control
                      name="style"
                      value={currentProject?.style || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Timeline</Form.Label>
                    <Form.Control
                      name="timeline"
                      value={currentProject?.timeline || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Project Value</Form.Label>
                    <Form.Control
                      name="projectValue"
                      value={currentProject?.projectValue || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Tags (comma separated)</Form.Label>
                    <Form.Control
                      name="tags"
                      value={currentProject?.tags?.join(", ") || ""}
                      onChange={handleTagsChange}
                    />
                  </Form.Group>

                  <Form.Check
                    type="switch"
                    id="featured-switch"
                    label="Featured Project"
                    checked={currentProject?.isFeatured || false}
                    onChange={(e) => {
                      if (
                        e.target.checked &&
                        featuredCount >= 4 &&
                        !currentProject?.isFeatured
                      ) {
                        setError("Maximum 4 featured projects allowed");
                        return;
                      }
                      setCurrentProject((prev) => ({
                        ...prev,
                        isFeatured: e.target.checked,
                      }));
                    }}
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Upload Images</Form.Label>
                <Form.Control type="file" onChange={handleImageUpload} />
                <Form.Text>
                  First image will be set as preview by default
                </Form.Text>
              </Form.Group>

              <div className="d-flex flex-wrap gap-3 mb-3">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="position-relative"
                    style={{ width: "150px", height: "150px" }}
                  >
                    <Image
                      src={image.url}
                      alt="Project image"
                      fill
                      style={{ objectFit: "cover" }}
                      className={`border ${image.isPreview ? "border-3 border-primary" : ""}`}
                    />
                    <Button
                      variant={image.isPreview ? "primary" : "secondary"}
                      size="sm"
                      className="position-absolute top-0 end-0 m-1"
                      onClick={() => setPreviewImage(image.id)}
                    >
                      {image.isPreview ? "Preview" : "Set as Preview"}
                    </Button>
                  </div>
                ))}
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
