"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export type CalPrefills = {
  // use mapping from links.ts
  calLink: string;
  // passed as query param
  name: string; // student full name
  id: string; // student id
  // retrieved via webhook
  email: string; // parent email
  guests: string; // student email
  smsReminderNumber: string; // parent number
};

export const CalC3 = ({
  calLink,
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
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          // todo
        },
      });
    })();
  }, []);
  return (
    <Cal
      calLink={calLink}
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
