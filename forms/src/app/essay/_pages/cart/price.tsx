import { CardFooter } from "~/components/ui/card";
import { Draft, EssayType, WordCountType } from "./constants";

interface CalculatePriceProps {
  essay: EssayType;
  wordCount?: WordCountType;
}
const calculatePrice = ({ essay, wordCount }: CalculatePriceProps) => {
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
      return 1000;
  }
};

export const TotalPrice = ({ drafts }: { drafts: Draft[] }) => {
  const totalPrice = drafts
    .filter((draft) => draft.type && draft.ready)
    .reduce((acc, draft) => {
      const { type } = draft;
      const { essay, wordCount } = type!;
      return acc + calculatePrice({ essay, wordCount });
    }, 0);

  return <CardFooter>Total Price: ${totalPrice}</CardFooter>;
};
