"use client";

import CountryOpt from "@/components/countryOpt";
import ThemeButton from "@/components/themeButton";
import { useStore } from "@/store/global";

export default function Header() {
  const base = useStore((state) => state.base);
  const setBase = useStore((state) => state.setBase);
  return (
    <div className="w-full border rounded-xl flex justify-between px-2 py-5">
      <div className="flex items-center gap-3">
        <img className="size-10 rounded-full" src="/icon2.png" alt="logo" />
        <h1 className="text-4xl tracking-wider text-linear-to-b from-red-950 to-green-500 font-bold">
          Currents
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <CountryOpt value={base} onChange={setBase} />
        <ThemeButton />
      </div>
    </div>
  );
}
