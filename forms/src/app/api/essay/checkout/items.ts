import { isProduction, ParsedDrafts } from "~/app/constants";

type StripeLineItem = {
  price_data: {
    product: string; // product id
    unit_amount: number; // price in cents
    currency: string; // currency code
  };
  quantity: number;
};

const COMMON_APP_COALITION = isProduction
  ? "prod_QeOHMOhEmWXaKi"
  : "prod_Qd6G1s6NJCE1kG";
const SUPPLEMENTAL_LT_250 = isProduction
  ? "prod_QeOHSelNhasvr2"
  : "prod_Qd6HXH1mbvjY1W";
const SUPPLEMENTAL_250_500 = isProduction
  ? "prod_QeOHGXsgx0SiJg"
  : "prod_Qd6IGmSZrZnZjT";
const SUPPLEMENTAL_GT_500 = isProduction
  ? "prod_QeOHRwmeQWwhlb"
  : "prod_Qd6J4oXGfu702p";
const LETTER_OF_CONTINUED_INTEREST = isProduction
  ? "prod_QeOHlnJspESfpw"
  : "prod_Qd6KYcEj5Gq0FU";

export const calculateLineItems = (drafts: ParsedDrafts): StripeLineItem[] => {
  const lineItems: StripeLineItem[] = [];
  drafts.forEach(([_id, draft]) => {
    const { type } = draft;
    const { essay, wordCount } = type;
    let productId = "";
    let unitAmount = 0; // in cents
    const TO_DOLLARS = 100;
    // todo, enum this with server items
    switch (essay) {
      case "Common App / Coalition":
        productId = COMMON_APP_COALITION;
        unitAmount = 98 * TO_DOLLARS;
        break;
      case "Supplemental Essay":
        switch (wordCount) {
          case "<250":
            productId = SUPPLEMENTAL_LT_250;
            unitAmount = 48 * TO_DOLLARS;
            break;
          case "250-500":
            productId = SUPPLEMENTAL_250_500;
            unitAmount = 68 * TO_DOLLARS;
            break;
          case ">500":
            productId = SUPPLEMENTAL_GT_500;
            unitAmount = 88 * TO_DOLLARS;
            break;
          default:
            productId = SUPPLEMENTAL_LT_250;
            unitAmount = 48 * TO_DOLLARS;
            break;
        }
        break;
      case "UC PIQ":
        productId = LETTER_OF_CONTINUED_INTEREST; // need to change to uc on stripe side
        unitAmount = 68 * TO_DOLLARS;
        break;
      default:
        productId = SUPPLEMENTAL_LT_250;
        unitAmount = 48 * TO_DOLLARS;
        break;
    }

    const existingItem = lineItems.find(
      (item) => item.price_data.product === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      lineItems.push({
        price_data: {
          product: productId,
          unit_amount: unitAmount,
          currency: "usd",
        },
        quantity: 1,
      });
    }
  });
  return lineItems;
};
