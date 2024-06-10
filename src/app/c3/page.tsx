"use client";

import { useSearchParams } from "next/navigation";
import { CalC3 } from "./_components/cal";
import { InvalidLink } from "@/src/components/invalidLink";
import { useState } from "react";
import { TallyC3 } from "./_components/tally";

export const dynamic = "force-dynamic";

export default function C3() {
  const params = useSearchParams();
  const id = params.get("id");
  const rep = params.get("rep");
  const fullname = params.get("fullname");

  if (!id || !rep || !fullname) return <InvalidLink />;

  const [calScheduled, setCalScheduled] = useState(false);

  return (
    <main>
      {!calScheduled ? (
        <CalC3
          id={id}
          name={fullname}
          rep={rep}
          setCalScheduled={setCalScheduled}
        />
      ) : (
        <TallyC3 name={fullname.split(" ")[0]} id={id} />
      )}
    </main>
  );
}
