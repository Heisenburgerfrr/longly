"use client";

import React from "react";
import dynamic from "next/dynamic";

const InteractiveArea = dynamic(
  () => import("@/components/InteractiveArea/InteractiveArea"),
  { ssr: false },
);

export default function InteractiveAreaWrapper() {
  return <InteractiveArea />;
}
