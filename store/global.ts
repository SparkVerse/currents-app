"use client";
import { persist } from "zustand/middleware";
import { create } from "zustand/react";

type Store = {
  base: string;
  target: string;
  setBase: (baseCurrency: string) => void;
  setTarget: (targetCurrency: string) => void;

  rates: { [key: string]: number };
  setRates: (rates: { [key: string]: number }) => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      base: "USD",
      target: "NGN",
      setBase: (baseCurrency) =>
        set({
          base: baseCurrency,
        }),
      setTarget: (targetCurrency) =>
        set({
          target: targetCurrency,
        }),
      rates: {},
      setRates: (rates) => set({ rates }),
    }),
    { name: "local-storage" },
  ),
);
