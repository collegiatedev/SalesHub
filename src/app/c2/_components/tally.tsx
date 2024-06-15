"use client";

import { useEffect, useState } from "react";

interface TallyC2Props {
  id: string;
  name: string;
  grade: string;
  setPageNumber: (pageNumber: number) => void;
}

export const TallyC2 = ({ id, name, grade, setPageNumber }: TallyC2Props) => {
  useEffect(() => {
    const handleFormSubmit = (event: MessageEvent) => {
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data.event === "Tally.FormPageView") {
          setPageNumber(data.payload.page);
        }
      } catch (error) {
        console.error("Error parsing form submission data:", error);
      }
    };
    window.addEventListener("message", handleFormSubmit);
    return () => window.removeEventListener("message", handleFormSubmit);
  }, [setPageNumber]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <iframe
        src={`https://tally.so/r/wzze8q?transparentBackground=1&id=${id}&name=${name}&grade=${grade}`}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          border: "none",
        }}
        title="Student Work Call Registration"
      ></iframe>
    </div>
  );
};
