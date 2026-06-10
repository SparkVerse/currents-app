"use client";

import { useStore } from "@/store/global";
import useConvertedAmount from "../hooks/useConvertedAmount";

export default function Comment() {
  const baseCurrency = useStore((state) => state.base);
  const targetCurrency = useStore((state) => state.target);
  const amount = useStore((state) => state.amount);
  const convertedAmount = useConvertedAmount();

  return (
    <div>
      <p className="md:text-3xl sm:text-2xl  text-lg text-center my-3 tracking-widest">
        Your {amount} {baseCurrency} is worth {convertedAmount} {targetCurrency}{" "}
        😄{" "}
      </p>
    </div>
  );
}
