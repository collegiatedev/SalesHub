"use client";

import { Wrapper } from "../../_components/wrapper";
import { useState } from "react";
import { PersonalInfo } from "./personal";
import { Drafts } from "./drafts";
import { DEFAULT_DRAFT, Draft } from "./constants";

export const Cart = () => {
  const [valid, setValid] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([DEFAULT_DRAFT]);

  return (
    <Wrapper title="Cart">
      <div className="space-y-4">
        <PersonalInfo valid={valid} setValid={setValid} />
        {valid && <Drafts drafts={drafts} setDrafts={setDrafts} />}
      </div>
    </Wrapper>
  );
};
