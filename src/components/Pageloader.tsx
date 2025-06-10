"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "react-bootstrap/Spinner";
import clsx from "clsx";

type PageloaderProps = {
  /** Show loader manually */
  loading?: boolean;
  /** Automatically show for `delay` ms */
  auto?: boolean;
  /** Duration in ms for auto loader */
  delay?: number;
  /** Show full-screen or inline */
  fullScreen?: boolean;
};

export default function Pageloader({
  loading,
  auto = true,
  delay = 2000,
  fullScreen = true,
}: PageloaderProps) {
  const [internalLoading, setInternalLoading] = useState(auto);

  useEffect(() => {
    if (auto) {
      const timer = setTimeout(() => setInternalLoading(false), delay);
      return () => clearTimeout(timer);
    }
  }, [auto, delay]);

  const isVisible = auto ? internalLoading : loading;

  if (!isVisible) return null;

  // Sizes depending on mode
  const spinnerSize = fullScreen ? "6rem" : "2.5rem";
  const imageSize = fullScreen ? 80 : 30;

  return (
    <div
      className={clsx(
        "bg-white d-flex align-items-center justify-content-center",
        fullScreen
          ? "position-fixed top-0 start-0 w-100 vh-100"
          : "w-100 h-100 position-relative"
      )}
      style={fullScreen ? { zIndex: 1055 } : {}}
    >
      <div className="position-relative">
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: spinnerSize, height: spinnerSize }}
        />
        <Image
          src="/logo.svg"
          alt="Icon"
          width={imageSize}
          height={imageSize}
          priority
          className="position-absolute top-50 start-50 translate-middle"
        />
      </div>
    </div>
  );
}
