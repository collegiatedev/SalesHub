"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { CalC1 } from "../_cals/calC1";
import { TallyC1 } from "../_tallys/tallyC1";

export const dynamic = "force-dynamic";

export default function C1() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const studentId = searchParams.get("studentId");
  const repId = searchParams.get("repId");

  const [firstForm, setFirstForm] = React.useState(true);

  return (
    <main>
      {firstForm ? (
        <TallyC1
          name={name}
          studentId={studentId}
          repId={repId}
          handleSubmit={() => setFirstForm(false)}
        />
      ) : (
        <CalC1 />
      )}
    </main>
  );
}
