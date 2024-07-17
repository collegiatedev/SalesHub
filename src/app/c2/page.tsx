"use client";

import { Suspense, useState } from "react";
import { CalC2 } from "./_components/cal";
import { TallyC2 } from "./_components/tally";
import { TallyC2P2 } from "./_components/tallyp2";
import { IdForm } from "~/components/idForm";
import { useSearchParams } from "next/navigation";
import { LeadFields } from "../api/lead/getLead";
import { concentrationToTally } from "./_components/concentrations";

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
  const [concentration, setConcentration] = useState<string>();
  const [tallyP2, setTallyP2] = useState(false);

  const id = useSearchParams().get("id");
  return (
    <IdForm id={id}>
      {(leadFields: LeadFields) => {
        // form 1
        if (!concentration)
          return (
            <TallyC2
              id={leadFields.id}
              name={leadFields.name}
              grade={leadFields.grade}
              setConcentration={setConcentration}
            />
          );

        // form 2
        if (concentration && !tallyP2) {
          const tallyId = concentrationToTally.get(concentration);
          if (!tallyId) {
            setTallyP2(true);
          } else {
            return (
              <TallyC2P2
                setTallyP2={setTallyP2}
                id={leadFields.id}
                name={leadFields.name}
                grade={leadFields.grade}
                tallyId={tallyId}
              />
            );
          }
        }

        // form 3
        return (
          <CalC2
            id={leadFields.id}
            name={leadFields.name}
            studentEmail={leadFields.contact.studentEmail}
            studentNumber={leadFields.contact.studentPhone}
            concentration={concentration}
          />
        );
      }}
    </IdForm>
  );
}
