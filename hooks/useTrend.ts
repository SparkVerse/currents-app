"use client";

import { TrendPoint, FrankfurterResponse } from "@/lib/response";
import { useQuery } from "@tanstack/react-query";

export function useTrend(base: string, target: string, timeframe: string) {
  return useQuery({
    queryKey: ["trend", base, target, timeframe],
    queryFn: async () => {
      const today = new Date();
      const startDate = new Date(today);

      if (timeframe === "7D") {
        startDate.setDate(today.getDate() - 7);
      } else if (timeframe === "1M") {
        startDate.setMonth(today.getMonth() - 1);
      } else {
        startDate.setFullYear(today.getFullYear() - 1);
      }

      const start = startDate.toISOString().split("T")[0];
      const end = today.toISOString().split("T")[0];

      const res = await fetch(
        `https://api.frankfurter.app/${start}..${end}?from=EUR&to=${base},${target}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch trend");
      }

      const data: FrankfurterResponse = await res.json();

      return Object.entries(data.rates)
        .map(([date, rateObj]: [string, Record<string, number>]) => {
          const baseRate = base === "EUR" ? 1 : rateObj[base];
          const targetRate = target === "EUR" ? 1 : rateObj[target];

          if (baseRate == null || targetRate == null) {
            return null;
          }

          return {
            date,
            rate: targetRate / baseRate,
          };
        })
        .filter((item): item is TrendPoint => item !== null);
    },

    staleTime: 1000 * 60 * 10,
  });
}
