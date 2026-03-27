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
      <div className="bg-neutral-700 flex justify-center items-center mt-1 border rounded-lg py-1 px-1 hover:py-1.5 hover:bg-amber-900 hover:delay-100 hover:ease-in-out">
        <button onClick={handleSwap} className="">
          <ArrowDownUp size={40} />
          {""}
        </button>
      </div>
    </>
  );
}
