"use client";
import { persist } from "zustand/middleware";
import { create } from "zustand/react";

type Store = {
  base: string;
  target: string;
    tf: string;

  setBase: (baseCurrency: string) => void;
  setTarget: (targetCurrency: string) => void;
  setTf: (tf: string) => void;

  rates: { [key: string]: number };
    irates: { date: string; rate: number };

  setRates: (rates: { [key: string]: number }) => void;
  setIRates: (irates: { date: string; rate: number }) => void;

};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      base: "USD",
      target: "NGN",
       tf: "7D",

      irates:[],

      setBase: (baseCurrency) =>
        set({
          base: baseCurrency,
        }),
      setTarget: (targetCurrency) =>
        set({
          target: targetCurrency,
        }),

      setTf: (tf) =>
        set({
          tf: tf,
        }),
      rates: {},
      setRates: (rates) => set({ rates }),
      setIRates: (irates) => set({ irates }),

    }),
    { name: "local-storage" },
  ),
);
