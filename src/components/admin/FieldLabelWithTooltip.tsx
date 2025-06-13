"use client";

import { useState, useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import TooltipImageModal from "./TooltipImageModal";

interface FieldLabelWithTooltipProps {
  field: string;
  label: string;
}

const tooltipImagesMap: { [key: string]: string[] } = {
  title: ["/tooltips/title-1.png", "/tooltips/title-2.png"],
  featureTitle: [
    "/tooltips/feature_title-1.png",
    "/tooltips/feature_title-2.png",
  ],
  description: ["/tooltips/description-2.png"],
  summary: ["/tooltips/summary-1.png"],
  location: ["/tooltips/location-2.png"],
  jobScope: ["/tooltips/job_scope-2.png"],
  style: ["/tooltips/style-2.png"],
  timeline: ["/tooltips/timeline-2.png"],
  projectValue: ["/tooltips/project_value-2.png"],
  tags: ["/tooltips/tags-1.png"],
  isFeatured: ["/tooltips/title-1.png"],
};

export default function FieldLabelWithTooltip({
  field,
  label,
}: FieldLabelWithTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const target = useRef<HTMLElement | null>(null);

  // Show tooltip on mouse enter icon or tooltip
  const handleMouseEnter = () => setShowTooltip(true);

  // Hide tooltip on mouse leave icon and tooltip
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <>
      {label}{" "}
      <span
        ref={target}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: "inline-block" }}
      >
        <FontAwesomeIcon
          icon={faCircleInfo}
          className="ms-1 text-primary"
          style={{ cursor: "pointer" }}
        />
      </span>
      <Overlay target={target.current} show={showTooltip} placement="right">
        {(props) => (
          <Tooltip
            id={`tooltip-${field}`}
            {...props}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ maxWidth: 400, ...props.style }}
          >
            {tooltipImagesMap[field]?.map((url, i) => (
              <Image
                width={400}
                height={225}
                key={i}
                src={url}
                alt={`${field}-tooltip-${i}`}
                className="img-fluid mb-2 rounded shadow"
                style={{ cursor: "pointer" }}
                onClick={() => setModalImage(url)}
              />
            )) || <small>No preview available</small>}
          </Tooltip>
        )}
      </Overlay>
      {modalImage && (
        <TooltipImageModal
          show={!!modalImage}
          imageUrl={modalImage}
          onHide={() => setModalImage(null)}
        />
      )}
    </>
  );
}
