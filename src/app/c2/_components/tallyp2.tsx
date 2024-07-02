"use client";

import { concentrationToTally } from "./concentrations";

interface TallyC2P2Props {
  id: string;
  name: string;
  grade: string;
  concentration: string;
}

const getConcentrationString = (concentrationInput: any) => {
  if (
    typeof concentrationInput === "object" &&
    concentrationInput !== null &&
    "concentration" in concentrationInput
  ) {
    return concentrationInput.concentration;
  }
  return concentrationInput; // Return the input directly if it's not an object with a concentration property
};

export const TallyC2P2 = ({ id, name, concentration }: TallyC2P2Props) => {
  const concentrationString = getConcentrationString(concentration);
  const tallyId = concentrationToTally.get(concentrationString.toString());

  if (tallyId === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <p>Thank We Will See You Soon! No Further Information Needed</p>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <iframe
        src={`https://tally.so/r/${tallyId}?transparentBackground=1&id=${id}&name=${name}`}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          border: "none",
        }}
        title="Student Work Call Registration"
      ></iframe>
    </div>
  );
};
