"use client";

import { useSearchParams } from "next/navigation";
import { CalC3 } from "./_components/cal";
import { InvalidLink } from "@/src/components/invalidLink";
import { useState } from "react";
import { TallyC3Prefills } from "./_components/tally";

export const dynamic = "force-dynamic";

export default function C3() {
  const params = useSearchParams();
  const id = params.get("id");
  const rep = params.get("rep");
  const fullname = params.get("fullname");

  if (!id || !rep || !fullname) return <InvalidLink />;

  const [prefills, setPrefills] = useState<TallyC3Prefills | null>(null);

  return (
    <main>
      {!prefills ? (
        <CalC3 id={id} name={fullname} rep={rep} setPrefills={setPrefills} />
      ) : (
        // <Tally>
        <div>tally</div>
      )}
    </main>
  );
}
