"use client";

export interface TallyC3Props {
  id: string;
  name: string;
}

export const TallyC3 = ({ id, name }: TallyC3Props) => {
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
        src={`https://tally.so/r/wAl8q0?transparentBackground=1&id=${id}&name=${name}`}
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
        title="Parent Insight Form"
      ></iframe>
    </div>
  );
};
