"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Contact Us" />

      <Container fluid className="py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col
              xs={12}
              md={8}
              lg={6}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h4 className="section-title">Contact Us</h4>
              <h1 className="display-5 mb-4">
                If You Have Any Query, Please Feel Free Contact Us
              </h1>
            </Col>
          </Row>
          <Row className="g-5">
            {/* Left Column */}
            <Col lg={6} data-aos="fade-up" data-aos-delay="100">
              <div className="d-flex flex-column justify-content-between h-100">
                {/* Address */}
                <div className="bg-light d-flex align-items-center w-100 p-4 mb-4">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                    style={{ width: "55px", height: "55px" }}
                  >
                    <i className="fa fa-map-marker-alt text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Address</p>
                    <h3 className="mb-0">
                      51 Goldhill Plaza #07-07, Singapore 308900
                    </h3>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-light d-flex align-items-center w-100 p-4 mb-4">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                    style={{ width: "55px", height: "55px" }}
                  >
                    <i className="fa fa-phone-alt text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Call Us Now</p>
                    <h3 className="mb-0">+65 82023432</h3>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-light d-flex align-items-center w-100 p-4">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                    style={{ width: "55px", height: "55px" }}
                  >
                    <i className="fa fa-envelope-open text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Mail Us Now</p>
                    <h3 className="mb-0">Project.sales@2Fresources.com</h3>
                  </div>
                </div>
              </div>
            </Col>

            {/* Contact Form */}
            <Col lg={6} data-aos="fade-up" data-aos-delay="500">
              <p className="mb-4">
                You can reach out to us using the form below. We&apos;ll get
                back to you as soon as possible.
              </p>
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && (
                  <Alert variant="success">
                    Thanks for contacting us! We&apos;ll get back to you soon.
                  </Alert>
                )}
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ height: 55 }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ height: 55 }}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        style={{ height: 55 }}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        name="message"
                        rows={5}
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Button
                      variant="primary"
                      className="w-100 py-3"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Google Map */}
      <Container
        fluid
        className="pt-5 px-0"
        data-aos="fade-in"
        data-aos-delay="100"
      >
        <iframe
          src="https://www.google.com/maps?q=51+Goldhill+Plaza+%2307-07,+Singapore+308900&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Container>
    </>
  );
}
