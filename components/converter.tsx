"use client";

import CountryOpt from "./countryOpt";
import { useStore } from "@/store/global";
import Swap from "./swap";
import { useRates } from "@/hooks/useRates";
import ConvertedAmount from "../hooks/useConvertedAmount";
import Comment from "./comment";

export default function Converter() {
  const { data, isLoading, isError } = useRates();
  const rates = data?.conversion_rates ?? {};

  const baseCurrency = useStore((state) => state.base);
  const setBaseCurrency = useStore((state) => state.setBase);
  const targetCurrency = useStore((state) => state.target);
  const setTargetCurrency = useStore((state) => state.setTarget);
  const amount = useStore((state) => state.amount);
  const setAmount = useStore((state) => state.setAmount);
  const convertedAmount = ConvertedAmount;

  if (isLoading) return <p className="text-center mt-10">Loading rates...</p>;
  if (isError) return <p className="text-center mt-10">Failed to load rates</p>;

  return (
    <>
      <Comment />
      <div className="bg-linear-to-r from-green-950 to-blue-950 rounded-lg p-1">
        <div className="flex justify-between items-center gap-1 [&_label]:font-bold">
          <div className="grid rounded-lg p-3 bg-card">
            <label htmlFor="from">From</label>
            <div>
              <div className="flex items-center border rounded-lg">
                <span>
                  <CountryOpt value={baseCurrency} onChange={setBaseCurrency} />
                </span>
                <span className="px-3 py-1">{baseCurrency}</span>
              </div>
              <input
                className="my-3 w-full md:h-20 sm:h-18 h-15 border outline-none pl-2 rounded-lg md:text-5xl text-4xl tracking-wider"
                value={amount.toLocaleString()}
                id="from"
                type="text"
                onChange={(e) =>
                  setAmount(Number(e.target.value.replace(/,/g, "")))
                }
              />
            </div>
          </div>
          <div className="grid rounded-lg p-3 bg-card [&_label]:tracking-widest">
            <label htmlFor="to">To</label>
            <div>
              <div className="flex items-center border rounded-lg">
                <span>
                  <CountryOpt
                    value={targetCurrency}
                    onChange={setTargetCurrency}
                  />
                </span>
                <span className=" px-3 py-1">{targetCurrency}</span>
              </div>
              <input
                className="my-3 w-full md:h-20 sm:h-18 h-15 border outline-none pl-2 rounded-lg md:text-5xl text-4xl"
                id="to"
                type="text"
                value={
                  convertedAmount
                    ? Number(convertedAmount).toLocaleString()
                    : ""
                }
                readOnly
              />
            </div>
          </div>
        </div>
        <Swap />
      </div>
    </>
  );
}
