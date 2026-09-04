"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type ThemeConfig, getThemeById } from "@/lib/themes"

interface ThemeVaultState {
  currentTheme: string
  previewTheme: string | null
  userTier: 1 | 2 | 3
  isPreviewMode: boolean
  setTheme: (themeId: string) => void
  setPreviewTheme: (themeId: string | null) => void
  setUserTier: (tier: 1 | 2 | 3) => void
  togglePreviewMode: () => void
  canAccessTheme: (theme: ThemeConfig) => boolean
  applyThemeToDocument: (themeId: string) => void
}

export const useThemeVault = create<ThemeVaultState>()(
  persist(
    (set, get) => ({
      currentTheme: "playful-retro",
      previewTheme: null,
      userTier: 3, // Free tier by default
      isPreviewMode: false,

      setTheme: (themeId: string) => {
        const theme = getThemeById(themeId)
        if (!theme) return

        const state = get()
        if (!state.canAccessTheme(theme)) return

        set({ currentTheme: themeId, previewTheme: null, isPreviewMode: false })
        state.applyThemeToDocument(themeId)
      },

      setPreviewTheme: (themeId: string | null) => {
        set({ previewTheme: themeId, isPreviewMode: !!themeId })
        if (themeId) {
          get().applyThemeToDocument(themeId)
        } else {
          get().applyThemeToDocument(get().currentTheme)
        }
      },

      setUserTier: (tier: 1 | 2 | 3) => {
        set({ userTier: tier })
      },

      togglePreviewMode: () => {
        const state = get()
        if (state.isPreviewMode) {
          state.setPreviewTheme(null)
        }
      },

      canAccessTheme: (theme: ThemeConfig) => {
        // Themes are currently available to everyone; tiers remain for display and future monetization.
        return Boolean(theme)
      },

      applyThemeToDocument: (themeId: string) => {
        const theme = getThemeById(themeId) ?? getThemeById("light-minimal")
        if (!theme || typeof document === "undefined") return

        const root = document.documentElement

        // Apply color tokens
        Object.entries(theme.tokens.colors).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value)
        })

        // Apply font tokens
        root.style.setProperty("--font-sans", theme.tokens.fonts.sans)
        root.style.setProperty("--font-mono", theme.tokens.fonts.mono)
        if (theme.tokens.fonts.display) {
          root.style.setProperty("--font-display", theme.tokens.fonts.display)
        }

        // Apply spacing tokens
        Object.entries(theme.tokens.spacing).forEach(([key, value]) => {
          root.style.setProperty(`--spacing-${key}`, value)
        })

        // Apply border radius
        root.style.setProperty("--radius", theme.tokens.borderRadius)

        // Apply shadow tokens
        Object.entries(theme.tokens.shadows).forEach(([key, value]) => {
          root.style.setProperty(`--shadow-${key}`, value)
        })

        // Add theme-specific classes
        root.className = root.className.replace(/theme-[\w-]+/g, "").trim()
        root.classList.add(`theme-${themeId}`)
      },
    }),
    {
      name: "themevault-storage",
      partialize: (state) => ({
        currentTheme: state.currentTheme,
        userTier: state.userTier,
      }),
    },
  ),
)
