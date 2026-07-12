"use client";

import React from "react";
import dynamic from "next/dynamic";

const UrlInputWidget = dynamic(
  () => import("@/components/UrlInputWidget/UrlInputWidget"),
  { ssr: false },
);

export default function InteractiveAreaWrapper() {
  return <UrlInputWidget />;
}
