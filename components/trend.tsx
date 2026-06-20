"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";
import EmptyState from "./emptyState";
import { useStore } from "@/store/global";
import { useTrend } from "@/hooks/useTrend";

export default function Trend() {
  const base = useStore((state) => state.base);
  const target = useStore((state) => state.target);
  const timeframe = useStore((state) => state.tf);
  const setTimeframe = useStore((state) => state.setTf);

  const { data: rates = [], isLoading } = useTrend(base, target, timeframe);

  const change =
    rates.length > 0 ? rates[rates.length - 1].rate - rates[0].rate : 0;
  const changePct = rates.length > 0 ? (change / rates[0].rate) * 100 : 0;
  const color = change > 0 ? "#22c55e" : change < 0 ? "#ef4444" : "#9ca3af";

  return (
    <div className="border my-3 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Trend</h1>
        <nav className="flex gap-1">
          {["7D", "1M", "1Y"].map((tf) => (
            <button
              key={tf}
              className={`px-3 py-1 rounded text-sm ${
                timeframe === tf ? "bg-blue-950 text-white" : "border"
              }`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-3 font-bold text-lg">
        {isLoading && <EmptyState />}

        {!isLoading && rates.length > 0 && (
          <span style={{ color }}>
            {rates[rates.length - 1].rate.toFixed(2)} {base}/{target}{" "}
            {change > 0 ? "🔺" : change < 0 ? "🔻" : "➖"}
            {changePct.toFixed(2)}%
          </span>
        )}
      </div>

      {!isLoading && rates.length > 0 && (
        <div className="mt-3 w-full h-[350px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth="100%"
            minHeight="100%"
          >
            <LineChart data={rates}>
              <YAxis
                domain={["dataMin", "dataMax"]}
                tickFormatter={(val) => val.toFixed(2)}
              />
              <XAxis
                dataKey="date"
                tickFormatter={(val) =>
                  new Date(val).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <Tooltip
                formatter={(value) => Number(value).toFixed(2)}
                labelFormatter={(label) =>
                  new Date(label).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke={color}
                strokeWidth={3}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
