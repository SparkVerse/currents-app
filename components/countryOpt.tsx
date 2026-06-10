"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Countries } from "@/lib/countries";
interface Props {
  value: string; // currency code
  onChange: (val: string) => void;
}

export default function CountryOpt({ value, onChange }: Props) {
  return (
    <>
      <Select defaultValue="Nigeria" value={value} onValueChange={onChange}>
        {" "}
        <SelectTrigger className=" border-none outline-none focus:border-none focus:outline-none">
          {" "}
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Countries.map((country) => (
            <SelectItem key={country.currency} value={country.currency}>
              <span className="flex items-center gap-2">
                <Image
                  className="size-3"
                  src={country.flag}
                  alt={country.abb}
                  width={24}
                  height={24}
                />
                {country.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
