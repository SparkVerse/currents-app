"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type TrendRate = {
  date: string;
  rate: number;
};

type Store = {
  base: string;
  target: string;
  tf: string;

  rates: Record<string, number>;
  irates: TrendRate[];

  setBase: (baseCurrency: string) => void;
  setTarget: (targetCurrency: string) => void;
  setTf: (tf: string) => void;

  setRates: (rates: Record<string, number>) => void;
  setIRates: (irates: TrendRate[]) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      base: "USD",
      target: "NGN",
      tf: "7D",

      rates: {},
      irates: [],

      setBase: (base) => set({ base }),
      setTarget: (target) => set({ target }),
      setTf: (tf) => set({ tf }),

      setRates: (rates) => set({ rates }),
      setIRates: (irates) => set({ irates }),
    }),
    {
      name: "local-storage",
    },
  ),
);
