import { Modal } from "react-bootstrap";
import Image from "next/image";

interface TooltipImageModalProps {
  show: boolean;
  imageUrl: string;
  onHide: () => void;
}

export default function TooltipImageModal({
  show,
  imageUrl,
  onHide,
}: TooltipImageModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Body className="text-center">
        <Image
          src={imageUrl}
          alt="Preview"
          width={800}
          height={450}
          className="img-fluid rounded shadow"
        />
      </Modal.Body>
    </Modal>
  );
}
