import { ParsedDrafts } from "~/app/constants";

type StripeLineItem = {
  price_data: {
    product: string; // product id
    unit_amount: number; // price in cents
    currency: string; // currency code
  };
  quantity: number;
};

const COMMON_APP_COALITION = "prod_QeOHMOhEmWXaKi";
const SUPPLEMENTAL_LT_250 = "prod_QeOHSelNhasvr2";
const SUPPLEMENTAL_250_500 = "prod_QeOHGXsgx0SiJg";
const SUPPLEMENTAL_GT_500 = "prod_QeOHRwmeQWwhlb";
const LETTER_OF_CONTINUED_INTEREST = "prod_QeOHlnJspESfpw";

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
      case "Letter of Continued Interest":
        productId = LETTER_OF_CONTINUED_INTEREST;
        unitAmount = 98 * TO_DOLLARS;
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
          currency: "usd", // set the currency you are using
        },
        quantity: 1,
      });
    }
  });
  return lineItems;
};
