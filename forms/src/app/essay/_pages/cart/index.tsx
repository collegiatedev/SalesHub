"use client";

import { Wrapper } from "../../_components/wrapper";
import { useState } from "react";
import { PersonalInfo } from "./personal";
import { Drafts } from "./drafts";

export const Cart = () => {
  const [valid, setValid] = useState(false);

  return (
    <Wrapper title="Cart">
      <div className="space-y-4">
        <PersonalInfo valid={valid} setValid={setValid} />
        {valid && <Drafts />}
      </div>
    </Wrapper>
  );
};
