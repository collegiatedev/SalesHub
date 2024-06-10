"use client";

import React, { useEffect, useState } from "react";
import { generateId } from "@/src/utils/id";
import { CalC1, Cal1Prefills } from "./_components/cal";
import { TallyC1 } from "./_components/tally";

export default function C1() {
  const [prefills, setPrefills] = useState<Cal1Prefills | null>(null);

  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    setId(generateId());
  }, []);

  if (!id) return <div>Loading...</div>;

  return (
    <main>
      {!prefills ? (
        <TallyC1 id={id!} setPrefills={setPrefills} />
      ) : (
        <CalC1
          id={prefills.id}
          name={prefills.name}
          smsReminderNumber={prefills.smsReminderNumber}
          email={prefills.email}
          guests={prefills.guests}
        />
      )}
    </main>
  );
}
