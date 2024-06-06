"use client";

import { useEffect } from "react";

interface PreC1Props {
  name: string | null;
  studentId: string | null;
  repId: string | null;
  handleSubmit: () => void;
}
export const TallyC1 = ({
  name,
  studentId,
  repId,
  handleSubmit,
}: PreC1Props) => {
  useEffect(() => {
    const handleFormSubmit = (event: any) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "Tally.FormSubmitted") handleSubmit();
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
        src={`https://tally.so/r/mJRLlK?transparentBackground=1&name=${name}&studentId=${studentId}&repId=${repId}`}
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
        title="Accelerator Program Registration"
      ></iframe>
    </div>
  );
};
