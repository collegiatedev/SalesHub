"use client";

import { Wrapper } from "../../_components/wrapper";
import { useState } from "react";
import { PersonalInfo } from "./personal";

export const Cart = () => {
  const [valid, setValid] = useState(false);

  return (
    <Wrapper title="Cart">
      <PersonalInfo valid={valid} setValid={setValid} />
      {valid && <div>valid</div>}
    </Wrapper>
  );
};
