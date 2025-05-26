"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

type AppointmentFormData = {
  name: string;
  email: string;
  mobile: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

export default function AppointmentSection() {
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: "",
    email: "",
    mobile: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit appointment");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        service: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="py-5">
      <Container>
        <Row className="g-5">
          <Col lg={6} data-aos="fade-up" data-aos-delay="100">
            <h4 className="section-title">Appointment</h4>
            <h1 className="display-5 mb-4">
              Make An Appointment To Start Your Dream Project
            </h1>
            <p className="mb-4">
              Every great renovation begins with a conversation. Share your
              vision with us, and our team will craft a tailored
              solution—whether it's a cozy HDB makeover, a sleek condo redesign,
              or a functional commercial space. We'll handle the details so you
              can focus on the excitement of transformation.
            </p>
            <Row className="g-4">
              <Col xs={12}>
                <div className="d-flex">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-light"
                    style={{ width: 65, height: 65 }}
                  >
                    <i className="fa fa-2x fa-phone-alt text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Call Us Now</p>
                    <h3 className="mb-0">+65 8202 3432</h3>
                  </div>
                </div>
              </Col>
              <Col xs={12}>
                <div className="d-flex">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-light"
                    style={{ width: 65, height: 65 }}
                  >
                    <i className="fa fa-2x fa-envelope-open text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Mail Us Now</p>
                    <h3 className="mb-0">Project.sales@2Fresources.com</h3>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={6} data-aos="fade-up" data-aos-delay="500">
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && (
                <Alert variant="success">
                  Your appointment request has been sent successfully. We will
                  contact you shortly.
                </Alert>
              )}
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ height: 55 }}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ height: 55 }}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Control
                    type="tel"
                    name="mobile"
                    placeholder="Your Mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    style={{ height: 55 }}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    style={{ height: 55 }}
                  >
                    <option value="">Choose Service</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="3D Drawing">3D Drawing</option>
                    <option value="Layout Planning">Layout Planning</option>
                    <option value="Renovation">Renovation</option>
                  </Form.Select>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    style={{ height: 55 }}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Control
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    style={{ height: 55 }}
                  />
                </Col>
                <Col xs={12}>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={5}
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <Button
                    variant="primary"
                    className="w-100 py-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Book Appointment"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
