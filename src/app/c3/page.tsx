"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { calIdToLink } from "./_components/links";
import { CalC3 } from "./_components/cal";

export const dynamic = "force-dynamic";

const InvalidLink = () => (
  <div>Invalid link, please contact +1(925)487-3772.</div>
);

export default function C3() {
  const params = useSearchParams();
  const id = params.get("id");
  const rep = params.get("rep");
  const fullname = params.get("fullname");

  if (!id || !rep || !fullname) return <InvalidLink />;

  const calLink = calIdToLink.get(rep);
  if (!calLink) return <InvalidLink />;

  const webhook = `https://hook.us1.make.com/p96owipfvhi0af2yk4i1to33r8solivk?id=${id}`;
  const { data, error, isLoading } = useQuery({
    queryKey: ["c3 cal prefills", id],
    queryFn: () => fetch(webhook).then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <InvalidLink />;

  console.log(data);

  const email = data["parentEmail"];
  const guests = data["studentEmail"];
  const smsReminderNumber = data["parentNumber"];

  if (!email || !guests || !smsReminderNumber) return <InvalidLink />;

  return (
    <main>
      <Suspense fallback={<>loading...</>}>
        <CalC3
          id={id}
          calLink={calLink}
          name={fullname}
          email={email}
          guests={guests}
          smsReminderNumber={smsReminderNumber}
        />
      </Suspense>
    </main>
  );
}
