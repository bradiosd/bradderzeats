import React from "react"
import { FaSun, FaMoon } from "react-icons/fa"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`w-10 h-10 flex items-center justify-center rounded-full ${theme === "dark"
          ? "bg-brand-green text-white hover:bg-brand-dark-green"
          : "bg-brand-black text-white hover:bg-brand-dark-green"
        }`}
    >
      {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  )
} 