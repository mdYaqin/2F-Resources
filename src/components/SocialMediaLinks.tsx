"use client";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialLink } from "@/data/socials";

type Size = "sm" | "md" | "lg";

const sizeMap = {
  sm: {
    button: { width: "28px", height: "28px" },
    icon: { fontSize: "14px" },
  },
  md: {
    button: { width: "38px", height: "38px" },
    icon: { fontSize: "18px" },
  },
  lg: {
    button: { width: "48px", height: "48px" },
    icon: { fontSize: "24px" },
  },
};

type Align = "start" | "center" | "end";

export default function SocialMediaLinks({
  links,
  size = "md",
  align = "start",
}: {
  links: SocialLink[];
  size?: Size;
  align?: Align;
}) {
  const { button, icon } = sizeMap[size];

  // Map align prop to Bootstrap justify-content class
  const justifyClass = {
    start: "justify-content-start",
    center: "justify-content-center",
    end: "justify-content-end",
  }[align];

  return (
    <div className={`d-flex gap-2 ${justifyClass}`}>
      {links.map(({ name, url, icon: iconDefinition, ariaLabel }) => (
        <a
          key={name}
          href={url}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
          title={ariaLabel}
        >
          <Button
            variant="outline-light"
            className="rounded-circle social-button"
            style={{
              ...button,
              padding: 0,
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={iconDefinition}
              style={{ ...icon, lineHeight: 1 }}
            />
          </Button>
        </a>
      ))}
    </div>
  );
}
