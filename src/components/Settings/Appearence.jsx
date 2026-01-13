import React from 'react'
import { useTheme } from "../theme-provider";

function Appearence() {
  const { theme, setTheme } = useTheme();

  return (
     <div className="max-w-2xl bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-medium">Theme</h2>
            <label onChange={() => setTheme("light")} className="flex gap-2 cursor-pointer"><input type="radio" name="option" value="light" checked={theme === "light"} className="cursor-pointer"   /> Light</label>
            <label onChange={() => setTheme("dark")} className="flex gap-2 cursor-pointer"><input type="radio" name="option" value="dark" checked={theme === "dark"} className="cursor-pointer" /> Dark</label>
            <label onChange={() => setTheme("system")} className="flex gap-2 cursor-pointer"><input type="radio" name="option" value="system" checked={theme === "system"} className="cursor-pointer"  /> System</label>
          </div>
  )
}

export default Appearence