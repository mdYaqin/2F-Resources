"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Alert,
  Spinner,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";

export default function ProjectImageUploadForm() {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [projectId, setProjectId] = useState("");
  const [featureImgIndex, setFeatureImgIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    variant: string;
  } | null>(null);

  useEffect(() => {
    // Cleanup blob URLs
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(selectedFiles);
      setPreviewUrls(selectedFiles.map((file) => URL.createObjectURL(file)));
      setFeatureImgIndex(null);
    }
  };

  const handleUpload = async () => {
    if (!projectId || images.length === 0) {
      setMessage({
        text: "Please select a project and at least one image.",
        variant: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("projectId", projectId);
    images.forEach((img) => formData.append("images", img));
    if (featureImgIndex !== null) {
      formData.append("featureImgIndex", featureImgIndex.toString());
    }

    setUploading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({
          text: `Uploaded ${data.count} images successfully.`,
          variant: "success",
        });
        setImages([]);
        setPreviewUrls([]);
        setFeatureImgIndex(null);
        setProjectId("");
      } else {
        setMessage({ text: data.error || "Upload failed.", variant: "danger" });
      }
    } catch (error) {
      setMessage({ text: "Upload error. Try again.", variant: "danger" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title>Upload Project Images</Card.Title>

          <Form.Group className="mb-3">
            <Form.Label>Project ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project ID"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Images</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </Form.Group>

          {previewUrls.length > 0 && (
            <>
              <Form.Label>Image Previews</Form.Label>
              <Row className="mb-3">
                {previewUrls.map((url, index) => (
                  <Col xs={6} md={4} lg={3} key={index} className="mb-3">
                    <div className="border rounded p-1">
                      <img
                        src={url}
                        alt={`preview-${index}`}
                        className="img-fluid rounded"
                        style={{
                          objectFit: "cover",
                          height: "150px",
                          width: "100%",
                        }}
                      />
                      <div className="mt-2 text-center small">
                        {featureImgIndex === index ? (
                          <strong className="text-primary">
                            Preview Image
                          </strong>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => setFeatureImgIndex(index)}
                          >
                            Set as Preview
                          </Button>
                        )}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </>
          )}

          <Button onClick={handleUpload} disabled={uploading}>
            {uploading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Uploading...
              </>
            ) : (
              "Upload Images"
            )}
          </Button>

          {message && (
            <Alert className="mt-3" variant={message.variant}>
              {message.text}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
