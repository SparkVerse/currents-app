"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip, YAxis, XAxis
} from "recharts";
import { useStore } from "@/store/global";

export default function Trend() {
  const base = useStore((state) => state.base);
  const target = useStore((state) => state.target);
  const timeframe = useStore((state) => state.tf);
    const setTimeframe = useStore((state) => state.setTf);
  const rates = useStore((state) => state.irates);
      const setRates = useStore((state) => state.setIRates);



  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTrend() {
      setLoading(true);

      const today = new Date();
      const startDate = new Date(today);

      if (timeframe === "7D") startDate.setDate(today.getDate() - 7);
      else if (timeframe === "1M") startDate.setMonth(today.getMonth() - 1);
      else if (timeframe === "1Y") startDate.setFullYear(today.getFullYear() - 1);

      const start_date = startDate.toISOString().split("T")[0];
      const end_date = today.toISOString().split("T")[0];

      try {
        const res = await fetch(
  `https://api.frankfurter.app/${start_date}..${end_date}?from=EUR&to=${base},${target}`
);

        const data = await res.json();
        console.log(data)

       let chartData = Object.entries(data.rates)
  .map(([date, rateObj]) => {
    const baseRate = base === "EUR" ? 1 : rateObj[base];
    const targetRate = target === "EUR" ? 1 : rateObj[target];

    if (!baseRate || !targetRate) return null;

    return {
      date,
      rate: targetRate / baseRate,
    };
  })
  .filter(Boolean) // remove nulls
  .sort(
    (a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  );



        // Ensure today exists
        if (chartData.length > 0) {
          const lastDate = chartData[chartData.length - 1].date;
          const todayStr = today.toISOString().split("T")[0];

          if (lastDate !== todayStr) {
            chartData.push({
              date: todayStr,
              rate: chartData[chartData.length - 1].rate,
            });
          }
        }

        setRates(chartData);
      } catch (err) {
        console.error("Error fetching trend:", err);
        setRates([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTrend();
  }, [timeframe, base, target]);

  const change =
    rates.length > 0
      ? rates[rates.length - 1].rate - rates[0].rate
      : 0;

  const changePct =
    rates.length > 0
      ? (change / rates[0].rate) * 100
      : 0;

  const color =
    change > 0
      ? "#22c55e"
      : change < 0
      ? "#ef4444"
      : "#9ca3af";

  return (
    <div className="border my-3 rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Trend</h1>

        <nav className="flex gap-1">
          {["7D", "1M", "1Y"].map((tf) => (
            <button
              key={tf}
              className={`px-3 py-1 rounded text-sm ${
                timeframe === tf
                  ? "bg-blue-950 text-white"
                  : "border"
              }`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </nav>
      </div>

      {/* Value */}
      <div className="mt-3 font-bold text-lg">
        {loading && <span>Loading...</span>}

        {!loading && rates.length > 0 && (
          <span style={{ color }}>
            {rates[rates.length - 1].rate.toFixed(2)} {base}/{target}{" "}
            {change > 0 ? "🔺" : change < 0 ? "🔻" : "➖"}{" "}
            {changePct.toFixed(2)}%
          </span>
        )}
      </div>

      {/* Chart */}
      {!loading && rates.length > 0 && (
        <div className="mt-3 w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%" minWidth='100%' minHeight='100%'>
            <LineChart data={rates}>
              <YAxis domain={["dataMin", "dataMax"]} tickFormatter={(val) => val.toFixed(2)} 
 />
              <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleString("en-US", {month:"short", day:"numeric"})}/>
              <Tooltip
                formatter={(value: number) => value.toFixed(2)}
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
                dot={{r:6}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}