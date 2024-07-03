"use client";

import { useSearchParams } from "next/navigation";
import { CalC3 } from "./_components/cal";
import { Suspense, useState } from "react";
import { TallyC3 } from "./_components/tally";
import { IdForm } from "~/components/idForm";
import { LeadFields } from "../api/lead/notion";

export default function C3() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <C3Content />
      </Suspense>
    </main>
  );
}

function C3Content() {
  const [calIsScheduled, setCalIsScheduled] = useState(false);

  const id = useSearchParams().get("id");
  return (
    <IdForm id={id}>
      {(leadFields: LeadFields) => {
        return (
          <>
            {!calIsScheduled ? (
              <CalC3
                id={leadFields.id}
                name={leadFields.name}
                repPageId={leadFields.pageRefs.leadRep}
                parentEmail={leadFields.contact.parentEmail}
                studentEmail={leadFields.contact.studentEmail}
                parentPhone={leadFields.contact.parentPhone}
                setCalIsScheduled={setCalIsScheduled}
              />
            ) : (
              <TallyC3 name={leadFields.name} id={leadFields.id} />
            )}
          </>
        );
      }}
    </IdForm>
  );
}
