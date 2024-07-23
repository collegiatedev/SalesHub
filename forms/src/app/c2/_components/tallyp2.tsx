"use client";

import { useEffect } from "react";

interface TallyC2P2Props {
  id: string;
  name: string;
  grade: string;
  tallyId: string;
  setTallyP2: (tally: boolean) => void;
}
export const TallyC2P2 = ({
  id,
  name,
  tallyId,
  setTallyP2,
}: TallyC2P2Props) => {
  useEffect(() => {
    const handleFormSubmit = (event: any) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "Tally.FormSubmitted") setTallyP2(true);
      } catch (error) {}
    };
    window.addEventListener("message", handleFormSubmit);
    return () => window.removeEventListener("message", handleFormSubmit);
  }, [id, setTallyP2]);

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
        src={`https://tally.so/r/${tallyId}?transparentBackground=1&id=${id}&name=${name}`}
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
        title="Module Registration"
      ></iframe>
    </div>
  );
};
