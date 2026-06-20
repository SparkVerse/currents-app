"use client";

import Image from "next/image";
import CountryOpt from "@/components/countryOpt";
import ThemeButton from "@/components/themeButton";
import { useStore } from "@/store/global";

export default function Header() {
  const base = useStore((state) => state.base);
  const setBase = useStore((state) => state.setBase);

  return (
    <div className="w-full border rounded-xl flex justify-between px-2 py-3">
      <div className="flex items-center gap-3">
        <Image
          className="size-10 rounded-full"
          src="/icon2.png"
          alt="logo"
          width={40}
          height={40}
        />
        <h1 className="sm:text-3xl text-2xl tracking-wider text-linear-to-b from-red-950 to-green-500 font-bold">
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
