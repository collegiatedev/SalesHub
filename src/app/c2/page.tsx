"use client";

import { useState } from "react";
import { CalC2 } from "./_components/cal";
import { TallyC2 } from "./_components/tally";
import { TallyC2P2 } from "./_components/tallyp2";
import { IdForm } from "~/components/idForm";
import { useSearchParams } from "next/navigation";
import { LeadFields } from "../api/lead/notion";

export default function C2() {
  const [concentration, setConcentration] = useState(null);
  const [calIsScheduled, setCalIsScheduled] = useState(false);

  const id = useSearchParams().get("id");
  return (
    <IdForm id={id}>
      {(leadFields: LeadFields) => {
        return (
          <>
            {concentration === null ? (
              <div>
                <TallyC2
                  id={leadFields.id}
                  name={leadFields.name}
                  grade={leadFields.grade}
                  setConcentration={setConcentration}
                />
              </div>
            ) : calIsScheduled ? (
              <div>
                <TallyC2P2
                  id={leadFields.id}
                  name={leadFields.name}
                  grade={leadFields.grade}
                  concentration={concentration}
                />
              </div>
            ) : (
              <div>
                <CalC2
                  id={leadFields.id}
                  name={leadFields.name}
                  setCalIsScheduled={setCalIsScheduled}
                  concentration={concentration}
                />
              </div>
            )}
          </>
        );
      }}
    </IdForm>
  );
}
