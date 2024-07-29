"use client";

import React, { useEffect, useState } from "react";
import { CalC1, Cal1Prefills } from "./_components/cal";
import { TallyC1 } from "./_components/tally";
import { generateId } from "~/lib/id";

export default function C1() {
  console.log("C1", process.env.NEXT_PUBLIC_NGROK_URL);

  const [prefills, setPrefills] = useState<Cal1Prefills | null>(null);

  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    setId(generateId());
  }, []);

  if (!id) return <div>Loading...</div>;

  return (
    <main>
      {!prefills ? (
        <TallyC1 id={id} setPrefills={setPrefills} />
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
