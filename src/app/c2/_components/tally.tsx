"use client";

import { useEffect, useState } from "react";

interface TallyC2Props {
  id: string;
  name: string;
  grade: string;
  setPageNumber: any; //fix this type
}

export const TallyC2 = ({ id, name, grade, setPageNumber }: TallyC2Props) => {
  useEffect(() => {
    const handleFormSubmit = (event: any) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === "Tally.FormPageView") {
          setPageNumber(data.payload.page);
        }
      } catch (error) {}
    };
    window.addEventListener("message", handleFormSubmit);
    return () => window.removeEventListener("message", handleFormSubmit);
  }, []);

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
