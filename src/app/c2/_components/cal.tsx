"use client";

import { InvalidLink } from "@/src/components/invalidLink";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import {
  concentrationToCal,
  concentrationToNotion,
} from "./concentrationLinks";
import { useQuery } from "@tanstack/react-query";

export type Cal2Props = {
  id: string;
  name: string;
  concentration: string;
  setCalIsScheduled: (isScheduled: boolean) => void;
};

const getConcentrationString = (concentrationInput: any) => {
  if (
    typeof concentrationInput === "object" &&
    concentrationInput !== null &&
    "concentration" in concentrationInput
  ) {
    return concentrationInput.concentration;
  }
  return concentrationInput; // Return the input directly if it's not an object with a concentration property
};

export const CalC2 = ({
  id,
  name,
  concentration,
  setCalIsScheduled,
}: Cal2Props) => {
  const concentrationString = getConcentrationString(concentration);
  //console.log("concentration from cal c2:", concentrationString);

  const calLink = concentrationToCal.get(concentrationString.toString());
  //console.log("callink", calLink);
  const webhook = `https://hook.us1.make.com/p96owipfvhi0af2yk4i1to33r8solivk?id=${id}`;

  const concentrationId = concentrationToNotion.get(
    concentrationString.toString()
  );
  const { data, error, isLoading } = useQuery({
    queryKey: ["c2 cal prefills", id],
    queryFn: () => fetch(webhook).then((res) => res.json()),
  });

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        //styles: { branding: { brandColor: "#000000" } },
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
  }, [setCalIsScheduled]);

  if (!calLink) return <InvalidLink />;
  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <InvalidLink />;

  const email = data["parentEmail"];
  const guests = data["studentEmail"];
  const smsReminderNumber = data["studentNumber"];

  if (!email || !guests || !smsReminderNumber || !concentrationId)
    return <InvalidLink />;

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
        concentrationId,
      }}
    />
  );
};
