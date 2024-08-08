import { EssayType, WordCountType } from "./constants";
import { ShoppingCart } from "lucide-react";
import { Alert, AlertTitle } from "~/components/ui/alert";
import { useDraftStore } from "./store";

interface CalculatePriceProps {
  essay?: EssayType;
  wordCount?: WordCountType;
}
const calculatePrice = ({ essay, wordCount }: CalculatePriceProps) => {
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
      return 1000;
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
  // console.log(totalPrice, drafts);

  return (
    <div className="flex w-full justify-end">
      <Alert className="w-auto bg-background">
        <ShoppingCart className="h-4 w-4" />
        <AlertTitle className="mb-0">${totalPrice}</AlertTitle>
      </Alert>
    </div>
  );
};
