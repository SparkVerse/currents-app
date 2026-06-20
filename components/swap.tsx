"use client";

import { useStore } from "@/store/global";
import { ArrowDownUp } from "lucide-react";

export default function Swap() {
  const baseCurrency = useStore((state) => state.base);
  const setBaseCurrency = useStore((state) => state.setBase);
  const targetCurrency = useStore((state) => state.target);
  const setTargetCurrency = useStore((state) => state.setTarget);

  const handleSwap = () => {
    const temp = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(temp);
  };
  return (
    <>
      <button
        className="w-full bg-neutral-700 flex justify-center items-center mt-1 border rounded-lg hover:py-0.5 hover:bg-amber-900 hover:delay-100 hover:ease-in-out"
        onClick={handleSwap}
      >
        <ArrowDownUp size={35} />
        {""}
      </button>
    </>
  );
}
