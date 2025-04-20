"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Simple toggle function
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Show a placeholder during SSR
  if (!mounted) {
    return <Button variant="outline" size="icon" className="w-9 h-9" />
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="w-9 h-9">
      {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">{resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>
    </Button>
  )
}
