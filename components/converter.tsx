"use client";
import { useEffect, useState } from "react";
import CountryOpt from "./countryOpt";
import { useStore } from "@/store/global";
import Swap from "./swap";

export default function Converter() {
  const baseCurrency = useStore((state) => state.base);
  const setBaseCurrency = useStore((state) => state.setBase);

  const targetCurrency = useStore((state) => state.target);
  const setTargetCurrency = useStore((state) => state.setTarget);

  const rates = useStore((state) => state.rates);
  const setRates = useStore((state) => state.setRates);

  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_API_KEY}/latest/USD`,
        );

        const data = await res.json();
        setRates(data.conversion_rates);
      } catch (err) {
        console.error("Failed to fetch rates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading rates...</p>;

  const convertedAmount =
    rates[baseCurrency] && rates[targetCurrency]
      ? (
          (Number(amount) * rates[targetCurrency]) /
          rates[baseCurrency]
        ).toFixed(3)
      : "";

  return (
    <>
      <p className="md:text-3xl  sm:text-2xl  text-lg text-center my-3 tracking-widest">
        Your {amount} {baseCurrency} is worth {convertedAmount} {targetCurrency}{" "}
        😄{" "}
      </p>

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
