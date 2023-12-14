"use client";

import Trailer from "@/components/Trailer/trailer";

export default function Page({ params }) {
  const param = params.link;

  return <Trailer url={param} />;
}
