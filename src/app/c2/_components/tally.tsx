"use client";

import { useEffect } from "react";
import { retrieveField } from "~/lib/tally";

interface TallyC2Props {
  id: string;
  name: string;
  grade: string;
  setConcentration: (concentration: string) => void;
}

export const TallyC2 = ({
  id,
  name,
  grade,
  setConcentration,
}: TallyC2Props) => {
  useEffect(() => {
    const handleFormSubmit = (event: any) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "Tally.FormSubmitted") {
          const concentration = retrieveField(data, "concentration");
          setConcentration(concentration);
        }
      } catch (error) {}
    };
    window.addEventListener("message", handleFormSubmit);
    return () => window.removeEventListener("message", handleFormSubmit);
  }, [id, setConcentration]);

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
