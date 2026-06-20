"use client";

import { useStore } from "@/store/global";

export default function useConvertedAmount(data: any) {
  const baseCurrency = useStore((state) => state.base);
  const targetCurrency = useStore((state) => state.target);
  const amount = useStore((state) => state.amount);

  const rates = data?.conversion_rates ?? {};

  return rates[baseCurrency] && rates[targetCurrency]
    ? ((amount * rates[targetCurrency]) / rates[baseCurrency]).toFixed(2)
    : "";
}
