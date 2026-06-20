"use client";

import CountryOpt from "./countryOpt";
import LoadingState from "./loadingState";
import { useStore } from "@/store/global";
import Swap from "./swap";
import { useRates } from "@/hooks/useRates";
import useConvertedAmount from "../hooks/useConvertedAmount";
import Comment from "./comment";

export default function Converter() {
  const {data, isLoading, isError } = useRates();
  const convertedAmount = useConvertedAmount(data);

  const baseCurrency = useStore((state) => state.base);
  const setBaseCurrency = useStore((state) => state.setBase);
  const targetCurrency = useStore((state) => state.target);
  const setTargetCurrency = useStore((state) => state.setTarget);
  const amount = useStore((state) => state.amount);
  const setAmount = useStore((state) => state.setAmount);

  if (isLoading) {
    <LoadingState />;
  }
  if (isError) return <p className="text-center mt-10">Failed to load rates</p>;


  return (
    <>
      {!isLoading ? (
        <div>
          <Comment />
          <div className="bg-linear-to-r from-green-950 to-blue-950 rounded-lg p-1">
            <div className="flex justify-between items-center gap-1 [&_label]:font-bold">
              <div className="grid rounded-lg p-3 bg-card">
                <label htmlFor="from">From</label>
                <div>
                  <div className="flex items-center border rounded-lg sm:text-sm text-xs">
                    <span>
                      <CountryOpt
                        value={baseCurrency}
                        onChange={setBaseCurrency}
                      />
                    </span>
                    <span className="px-3 py-1">{baseCurrency}</span>
                  </div>
                  <input
                    className="my-3 w-full md:h-18 sm:h-15 h-13 border outline-none pl-2 rounded-lg md:text-5xl text-4xl tracking-wider"
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
                  <div className="flex items-center border rounded-lg sm:text-sm text-xs">
                    <span>
                      <CountryOpt
                        value={targetCurrency}
                        onChange={setTargetCurrency}
                      />
                    </span>
                    <span className=" px-3 py-1">{targetCurrency}</span>
                  </div>
                  <input
                    className="my-3 w-full md:h-18 sm:h-15 h-13 border outline-none pl-2 rounded-lg md:text-5xl text-4xl"
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
        </div>
      ) : (
        <LoadingState />
      )}
    </>
  );
}
