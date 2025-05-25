"use client";

import { useState } from "react";
import { Tabs, Tab, Button, Row, Alert } from "react-bootstrap";
import ProjectList from "./ProjectList";
import ProjectFormModal from "./ProjectFormModal";
import useProjects from "../hooks/useProjects";

export default function TabsWrapper() {
  const [activeTab, setActiveTab] = useState("list");
  const {
    projects,
    featuredCount,
    error,
    loading,
    showModal,
    setShowModal,
    currentProject,
    setCurrentProject,
    images,
    setImages,
    handleDelete,
  } = useProjects();

  return (
    <>
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

          <ProjectList
            loading={loading}
            projects={projects}
            onEdit={(project) => {
              setCurrentProject(project);
              setImages(project.images || []);
              setShowModal(true);
            }}
            onDelete={handleDelete}
          />
        </Tab>

        <Tab eventKey="enquiries" title="Enquiries">
          <p>Enquiries tab content will go here.</p>
        </Tab>

        <Tab eventKey="users" title="User Management">
          <p>User management tab content will go here.</p>
        </Tab>
      </Tabs>

      <ProjectFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        images={images}
        setImages={setImages}
        featuredCount={featuredCount}
      />
    </>
  );
}
