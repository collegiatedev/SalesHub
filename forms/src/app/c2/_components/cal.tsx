"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { concentrationToCal, concentrationToNotion } from "./concentrations";
import { InvalidLink } from "~/components/invalidLink";

export type Cal2Props = {
  id: string;
  name: string;
  concentration: string;
  studentEmail: string;
  studentNumber: string;
};

export const CalC2 = ({
  id,
  name,
  concentration,
  studentEmail,
  studentNumber,
}: Cal2Props) => {
  const concentrationId = concentrationToNotion.get(concentration);
  const calLink = concentrationToCal.get(concentration);

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

  if (!calLink || !concentrationId) return <InvalidLink />;

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        layout: "month_view",
        name,
        email: studentEmail,
        smsReminderNumber: studentNumber,
        concentrationId,
        id,
      }}
    />
  );
};
