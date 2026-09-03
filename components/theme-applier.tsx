"use client"

import { useEffect } from "react"
import { useThemeVault } from "@/hooks/use-theme-vault"

export function ThemeApplier() {
  const { currentTheme, applyThemeToDocument } = useThemeVault()

  useEffect(() => {
    applyThemeToDocument(currentTheme || "light-minimal")
  }, [applyThemeToDocument, currentTheme])

  return null
}
