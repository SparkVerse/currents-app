"use client";

import { useStore } from "@/store/global";
import { ChartLine } from "lucide-react";

export default function Trend() {
  const timeframe = useStore((state) => state.tf);
  const setTimeframe = useStore((state) => state.setTf);

  return (
    <div className="">
      <div className="flex justify-between items-center border rounded-lg my-5 p-2">
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
      <div className="h-40 flex border-b border-l rounded-bl-lg mt-3 mx-3 ">
        <span className="m-auto">
          {" "}
          <ChartLine className="size-16 text-gray-800" />
        </span>
      </div>
    </div>
  );
}
