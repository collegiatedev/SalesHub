"use client";

import { Suspense, useState } from "react";
import { CalC2 } from "./_components/cal";
import { TallyC2 } from "./_components/tally";
import { useSearchParams } from "next/navigation";
import { TallyC2P2 } from "./_components/tallyp2";
import { useQuery } from "@tanstack/react-query";
import { LeadHandlerResponse } from "../api/lead/route";

export default function C2() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <C2Content />
      </Suspense>
    </main>
  );
}

function C2Content() {
  const [concentration, setConcentration] = useState(null);
  const [calIsScheduled, setCalIsScheduled] = useState(false);

  // const id = useSearchParams().get("id");
  // const { ready, data } = useLeadQuery(id);

  // if (!ready) return <div>{data}</div>;

  const id = useSearchParams().get("id");
  if (id === null) return <div>No id provided</div>;

  const query = useQuery({
    queryKey: ["lead data fetch", id as string],
    queryFn: () => fetch(`/api/lead?id=${id}`).then((res) => res.json()),
  });

  if (query.isLoading) return <div>Loading...</div>;

  const data = query.data as LeadHandlerResponse;
  const lead = data.data;

  // null lead means there was an error
  if (lead === null) return <div>{data.message}</div>;

  return (
    <>
      {concentration === null ? (
        <div>
          <TallyC2
            id={lead.id}
            name={lead.name}
            grade={lead.grade}
            setConcentration={setConcentration}
          />
        </div>
      ) : calIsScheduled ? (
        <div>
          <TallyC2P2
            id={lead.id}
            name={lead.name}
            grade={lead.grade}
            concentration={concentration}
          />
        </div>
      ) : (
        <div>
          <CalC2
            id={lead.id}
            name={lead.name}
            setCalIsScheduled={setCalIsScheduled}
            concentration={concentration}
          />
        </div>
      )}
    </>
  );
}
