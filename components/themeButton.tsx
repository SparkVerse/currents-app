"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeButton() {
    const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <>
      <button
        onClick={() => {
          {theme === 'dark'? (setTheme('light')): (setTheme('dark'))}
        }}
      >
        {theme === 'dark' ? (<Sun size={28}/> ): (<Moon size={28} />)}
      </button>
    </>
  );
}
