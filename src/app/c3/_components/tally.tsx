"use client";

import { useEffect } from "react";
import { retrieveField } from "@/src/utils/tally";

export interface TallyC3Prefills {
  id: string;
}

export const TallyC1 = ({ id }: TallyC3Prefills) => {
  useEffect(() => {
    const handleFormSubmit = (event: any) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === "Tally.FormSubmitted") {
          const who = retrieveField(data, "who");

          //   setPrefills({ id, name, email, guests, smsReminderNumber });
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
        src={`https://tally.so/r/3lyRbk?transparentBackground=1&id=${id}`}
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
