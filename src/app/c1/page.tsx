"use client";

import React, { useEffect, useState } from "react";
import { generateId } from "@/src/utils/id";
import Cal, { getCalApi } from "@calcom/embed-react";

export const dynamic = "force-dynamic";

type CalPrefills = {
  name: string;
  email: string;
};
export default function C1() {
  const [prefills, setPrefills] = useState<CalPrefills | null>(null);

  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    setId(generateId());
  }, []);

  if (id === null) return <div>Loading...</div>;

  return (
    <main>
      {prefills === null ? (
        <TallyC1 id={id!} setPrefills={setPrefills} />
      ) : (
        <CalC1 id={id!} name={prefills!.name} email={prefills!.email} />
      )}
    </main>
  );
}

interface TallyC1Props {
  id: string;
  setPrefills: (props: CalPrefills) => void;
}
const TallyC1 = ({ id, setPrefills }: TallyC1Props) => {
  useEffect(() => {
    const handleFormSubmit = (event: any) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === "Tally.FormSubmitted") {
          const name = data.payload.fields.reduce((acc: any, field: any) => {
            if (field.title === "name") return field.answer.value;
            return acc;
          }, "");

          const email = data.payload.fields.reduce((acc: any, field: any) => {
            if (field.title === "email") return field.answer.value;
            return acc;
          }, "");

          setPrefills({ name, email });
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
        src={`https://tally.so/r/mJRLlK?transparentBackground=1&id=${id}`}
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

interface CalC1Props {
  id: string;
  name: string;
  email: string;
}
const CalC1 = ({ id, name, email }: CalC1Props) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <Cal
      calLink="jesse-lee/test"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        layout: "month_view",
        name,
        email,
        id,
      }}
    />
  );
};
