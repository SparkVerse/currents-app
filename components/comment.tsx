"use client";

import { useStore } from "@/store/global";
import useConvertedAmount from "../hooks/useConvertedAmount";
import { useRates } from "@/hooks/useRates";

export default function Comment() {
  const { data } = useRates();
  const convertedAmount = useConvertedAmount(data);

  const baseCurrency = useStore((state) => state.base);
  const targetCurrency = useStore((state) => state.target);
  const amount = useStore((state) => state.amount);

  return (
    <div>
      <p className="md:text-lg sm:text-sm text-xs text-center mt-10 mb-2 tracking-widest">
        Your {amount} {baseCurrency} is worth {convertedAmount} {targetCurrency}{" "}
        😄{" "}
      </p>
    </div>
  );
}
