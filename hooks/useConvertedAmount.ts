"use client";

import { useRates } from "./useRates";
import { useStore } from "@/store/global";

export default function useConvertedAmount() {
  const { data } = useRates();

  const baseCurrency = useStore((state) => state.base);
  const targetCurrency = useStore((state) => state.target);
  const amount = useStore((state) => state.amount);

  const rates = data?.conversion_rates ?? {};

  return rates[baseCurrency] && rates[targetCurrency]
    ? (
        (amount * rates[targetCurrency]) /
        rates[baseCurrency]
      ).toFixed(3)
    : "";
}