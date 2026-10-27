import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Currency = "INR" | "USD" | "GBP" | "AED";

// Exchange rates relative to INR. These are STATIC approximations (not live rates)
// and must be reviewed periodically. They are for display only: the customer is
// always charged in INR at checkout, and the UI says so.
const RATES: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  GBP: 0.0095,
  AED: 0.044,
};

const SYMBOLS: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  GBP: "£",
  AED: "د.إ",
};

const FLAGS: Record<Currency, string> = {
  INR: "🇮🇳",
  USD: "🇺🇸",
  GBP: "🇬🇧",
  AED: "🇦🇪",
};

type CurrencyStore = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convert: (priceINR: number) => number;
  format: (priceINR: number) => string;
  symbol: () => string;
  flag: () => string;
};

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: "INR",

      setCurrency: (c) => set({ currency: c }),

      convert: (priceINR) => {
        const rate = RATES[get().currency];
        return Math.round(priceINR * rate * 100) / 100;
      },

      format: (priceINR) => {
        const cur = get().currency;
        const rate = RATES[cur];
        const converted = priceINR * rate;

        if (cur === "INR") {
          return `₹${Math.round(converted).toLocaleString("en-IN")}`;
        }
        return `${SYMBOLS[cur]}${converted.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`;
      },

      symbol: () => SYMBOLS[get().currency],
      flag: () => FLAGS[get().currency],
    }),
    {
      name: "zevar-currency",
    }
  )
);

export { RATES, SYMBOLS, FLAGS };
export const ALL_CURRENCIES: Currency[] = ["INR", "USD", "GBP", "AED"];
