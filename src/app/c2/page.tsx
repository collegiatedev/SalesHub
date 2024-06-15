"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { CalC2 } from "./_components/cal";
import { TallyC2 } from "./_components/tally";
import { useSearchParams } from "next/navigation";
import { InvalidLink } from "@/src/components/invalidLink";

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
  const params = useSearchParams();
  const id = params.get("id");
  const fullname = params.get("fullname");
  const grade = params.get("grade");

  if (!id || !fullname || !grade) return <InvalidLink />;
  return (
    <>
      {concentration === null ? (
        <div>
          <TallyC2
            id={id}
            name={fullname.split(" ")[0]}
            grade={grade}
            setConcentration={setConcentration}
          />
        </div>
      ) : (
        <div>
          <CalC2
            id={id}
            name={fullname}
            setCalIsScheduled={setCalIsScheduled}
            concentration={concentration}
          />
        </div>
      )}
    </>
  );
}
