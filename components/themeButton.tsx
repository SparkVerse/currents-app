"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

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
