"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { InvalidLink } from "~/components/invalidLink";

// notion sales rep page id -> cal c3 embed link
// make sure its in dash-format
const getCalLink = new Map<string, string>([
  ["cece3b60-98b3-469e-bd22-61ebd7319aad", "jesse-lee/c3"],
  ["4808b0f6-992a-4f3a-8d8a-58946d7804f6", "ibansal/c3"],
  ["d17c02cd-3050-4f66-a763-eefe698087c5", "mridulp/c3"],
  // require one of the above to be present
  ["a767aaef-c343-43fb-bdec-828befc5a26c", "team/collegiate/c3-r"], // raghu
  ["7aa42588-e95c-490a-9ca3-6cd8a0b56487", "team/collegiate/c3-s"], // shashank
]);

type Cal3Props = {
  id: string; // student id
  name: string; // student name
  repPageId?: string;
  parentEmail: string;
  studentEmail: string;
  parentPhone: string;
  setCalIsScheduled: (props: boolean) => void;
};
export const CalC3 = ({
  id,
  name,
  repPageId,
  parentEmail,
  studentEmail,
  parentPhone,
  setCalIsScheduled,
}: Cal3Props) => {
  const calLink = getCalLink.get(repPageId as string);

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
          console.log("bookingSuccessful", e);
          setCalIsScheduled(true);
        },
      });
    })();
  });

  if (!calLink) return <InvalidLink />;

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        layout: "month_view",
        name,
        id,
        email: parentEmail,
        guests: studentEmail,
        smsReminderNumber: parentPhone,
      }}
    />
  );
};
