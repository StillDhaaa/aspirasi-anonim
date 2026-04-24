"use client";
/* eslint-disable react-hooks/set-state-in-effect */

// --- UI Primitives ---
import { Button } from "./ui/button";

// --- Icons ---
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button type="button" data-style="ghost" aria-hidden="true" disabled>
        <div className="h-10 w-10" />
      </Button>
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const toggleDarkMode = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      className="text-primary h-10 w-10"
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
    >
      {currentTheme === "dark" ? (
        <FaMoon className="h-10 w-10" />
      ) : (
        <FaSun className="h-10 w-10" />
      )}
    </button>
  );
}
