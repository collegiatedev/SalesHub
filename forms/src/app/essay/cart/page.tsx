"use client";

import { useState, useEffect, useRef } from "react";
import { PersonalInfo } from "~/app/essay/cart/personal";
import { MyTitle } from "~/components/myTitle";
import { NavButton } from "~/components/myButtons";
import { Drafts } from "./drafts";
import { useDraftStore } from "./store";

export default function Cart() {
  const [valid, setValid] = useState(false);
  const drafts = useDraftStore((state) =>
    state.getDrafts().map((d) => d.draft)
  );
  const isReady = drafts.some((draft) => draft.ready);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isReady && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isReady]);

  return (
    <>
      <div className="flex justify-items-start gap-3">
        <NavButton route="/essay" text="Back" backwards />
        <MyTitle title="Shopping Cart" />
      </div>

      <div className="space-y-4">
        <PersonalInfo valid={valid} setValid={setValid} />
        {valid && <Drafts />}
        <div className="mt-8 w-full flex justify-end">
          {isReady && <NavButton route="/essay" text="Checkout" />}
        </div>
      </div>
      <div ref={bottomRef} />
    </>
  );
}
