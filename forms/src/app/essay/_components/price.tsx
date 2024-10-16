"use client";

import { CalculatePriceProps } from "../../constants";
import { ShoppingCart } from "lucide-react";
import { Alert, AlertTitle } from "~/components/ui/alert";
import { useDraftStore } from "../store";
import { Draft } from "../../constants";

export const calculatePrice = ({
  essay,
  wordCount,
}: Partial<CalculatePriceProps>) => {
  // todo, enum this with server items
  if (!essay) return 1000;
  switch (essay) {
    case "Common App / Coalition":
      return 98;
    case "Supplemental Essay":
      switch (wordCount) {
        case "<250":
          return 48;
        case "250-500":
          return 68;
        case ">500":
          return 88;
        default:
          return 1000;
      }
    case "Letter of Continued Interest":
      return 98;
    default:
      return 98; //changing this to our highest priced item
  }
};

export const TotalPrice = () => {
  const drafts = useDraftStore((state) =>
    state.getDrafts().map((d) => d.draft)
  );
  const totalPrice = drafts
    .filter((draft) => draft.type && draft.ready)
    .reduce((acc, draft) => {
      const { type } = draft;
      const { essay, wordCount } = type;
      return acc + calculatePrice({ essay, wordCount });
    }, 0);

  return (
    <div className="flex w-full justify-end">
      <Alert className="w-auto bg-background">
        <ShoppingCart className="h-4 w-4" />
        <AlertTitle className="mb-0 font-bold">${totalPrice}</AlertTitle>
      </Alert>
    </div>
  );
};

export const ItemPrice = ({ draft }: { draft: Draft }) => {
  const { type } = draft;
  const { essay, wordCount } = type;
  const price = calculatePrice({ essay, wordCount });
  return <Alert className="w-auto bg-background p-3 text-md">${price}</Alert>;
};
