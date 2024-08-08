"use client";

import { useState } from "react";
import { PersonalInfo } from "~/app/essay/cart/personal";
import { MyTitle } from "~/components/myTitle";
import { NavButton } from "~/components/navButton";
import { Drafts } from "./drafts";
import { Draft, DEFAULT_DRAFT } from "./constants";

// import { Wrapper } from "../../_components/wrapper";
// import { useState } from "react";
// import { PersonalInfo } from "./personal";
// import { Drafts } from "./drafts";
// import { DEFAULT_DRAFT, Draft } from "./constants";

export default function Cart() {
  const [valid, setValid] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([DEFAULT_DRAFT]);

  return (
    <>
      <div className="flex justify-items-start gap-3">
        <NavButton route="/essay" text="Back" backwards />
        <MyTitle title="Shopping Cart" />
      </div>
      <div className="space-y-4">
        <PersonalInfo valid={valid} setValid={setValid} />
        {valid && <Drafts drafts={drafts} setDrafts={setDrafts} />}
      </div>
    </>
  );
}
