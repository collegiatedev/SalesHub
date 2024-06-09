"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export type CalPrefills = {
  id: string;
  name: string;
  email: string;
  guests: string;
  smsReminderNumber: string;
};

export const CalC1 = ({
  id,
  name,
  email,
  guests,
  smsReminderNumber,
}: CalPrefills) => {
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
      calLink="team/collegiate/c1"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        layout: "month_view",
        name,
        email,
        id,
        guests,
        smsReminderNumber,
      }}
    />
  );
};
