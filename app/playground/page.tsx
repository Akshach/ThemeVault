"use client"

import { useEffect } from "react"
import { ThemePlayground } from "@/components/theme-playground"
import { useThemeVault } from "@/hooks/use-theme-vault"

export default function PlaygroundPage() {
  const { applyThemeToDocument, currentTheme } = useThemeVault()

  useEffect(() => {
    // Apply the current theme on mount
    applyThemeToDocument(currentTheme)
  }, [applyThemeToDocument, currentTheme])

  return <ThemePlayground />
}
