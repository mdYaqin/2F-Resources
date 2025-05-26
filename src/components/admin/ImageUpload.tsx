"use client";
import { Form, Button } from "react-bootstrap";
import Image from "next/image";
import { Image as ImageType } from "@/types";

interface ImageUploadProps {
  images: ImageType[];
  onImageAdd: (file: File) => void;
  onPreviewSet: (imageId: string) => void;
  onImageRemove: (imageId: string) => void;
}

export default function ImageUpload({
  images,
  onImageAdd,
  onPreviewSet,
  onImageRemove,
}: ImageUploadProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageAdd(file);
    }
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Upload Images</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
        <Form.Text>First image will be set as preview by default</Form.Text>
      </Form.Group>

      <div className="d-flex flex-wrap gap-3 mb-3">
        {images.map((image, index) =>
          !image._removed ? (
            <div
              key={image.id || `${image.url}-${index}`}
              className="position-relative"
              style={{ width: "150px", height: "150px" }}
            >
              {(image.url || image.previewData) && (
                <Image
                  src={image.url || image.previewData!}
                  alt="Project image"
                  fill
                  style={{ objectFit: "cover" }}
                  className={`border ${
                    image.isPreview ? "border-3 border-primary" : ""
                  }`}
                />
              )}

              <div className="position-absolute top-0 start-0 end-0 d-flex justify-content-between p-1">
                <Button
                  variant={image.isPreview ? "primary" : "outline-primary"}
                  size="sm"
                  onClick={() => onPreviewSet(image.id!)}
                  style={{ width: "60%" }}
                >
                  {image.isPreview ? "★ Preview" : "Set Preview"}
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    onImageRemove(image.id!);
                  }}
                  style={{ width: "35%" }}
                  title="Remove image"
                >
                  ×
                </Button>
              </div>
            </div>
          ) : null
        )}
      </div>
    </>
  );
}
