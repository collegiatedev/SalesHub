"use client";

import { useSearchParams } from "next/navigation";
import { CalC3 } from "./_components/cal";
import { InvalidLink } from "@/src/components/invalidLink";
import { Suspense, useState } from "react";
import { TallyC3 } from "./_components/tally";

export const dynamic = "force-dynamic";

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

  const params = useSearchParams();
  const id = params.get("id");
  const rep = params.get("rep");
  const fullname = params.get("fullname");

  if (!id || !rep || !fullname) return <InvalidLink />;
  return (
    <>
      {!calIsScheduled ? (
        <CalC3
          id={id}
          name={fullname}
          rep={rep}
          setCalIsScheduled={setCalIsScheduled}
        />
      ) : (
        <TallyC3 name={fullname.split(" ")[0]} id={id} />
      )}
    </>
  );
}
