"use client";

import { Wrapper } from "../../_components/wrapper";
import { useState } from "react";
import { PersonalInfo } from "./personal";
import { Draft, Drafts } from "./drafts";

export const defaultDraft: Draft = { title: "", ready: false };

export const Cart = () => {
  const [valid, setValid] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([defaultDraft]);

  return (
    <Wrapper title="Cart">
      <div className="space-y-4">
        <PersonalInfo valid={valid} setValid={setValid} />
        {valid && <Drafts drafts={drafts} setDrafts={setDrafts} />}
      </div>
    </Wrapper>
  );
};
