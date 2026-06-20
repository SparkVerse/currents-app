"use client";

import Converter from "@/components/converter";
import Trend from "@/components/trend";
import Header from "@/components/header";

export default function Home() {
  
  return (
    <div className="min-h-screen max-w-3xl m-auto bg-blur p-1 flex flex-col">
      <Header/>
      <main className="m-3 flex flex-col justify-between">
        <Converter />
        <Trend />
      </main>
    </div>
  );
}
