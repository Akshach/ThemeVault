"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ThemeConfig } from "@/lib/themes"
import { ExportGenerator, type ExportOptions, type ExportResult } from "@/lib/export-generator"

interface ExportState {
  exports: ExportResult[]
  isExporting: boolean
  exportTheme: (theme: ThemeConfig, options: ExportOptions) => Promise<ExportResult>
  deleteExport: (exportId: string) => void
  clearExports: () => void
  canExport: (userTier: number) => boolean
  getExportLimits: (userTier: number) => { monthly: number; formats: string[] }
}

export const useExport = create<ExportState>()(
  persist(
    (set, get) => ({
      exports: [],
      isExporting: false,

      exportTheme: async (theme: ThemeConfig, options: ExportOptions) => {
        set({ isExporting: true })

        try {
          // Simulate export processing time
          await new Promise((resolve) => setTimeout(resolve, 1500))

          const result = await ExportGenerator.generateExport(theme, options)

          set((state) => ({
            exports: [result, ...state.exports],
            isExporting: false,
          }))

          return result
        } catch (error) {
          set({ isExporting: false })
          throw error
        }
      },

      deleteExport: (exportId: string) => {
        set((state) => ({
          exports: state.exports.filter((exp) => exp.id !== exportId),
        }))
      },

      clearExports: () => {
        set({ exports: [] })
      },

      canExport: (userTier: number) => {
        const limits = get().getExportLimits(userTier)
        const thisMonth = new Date().getMonth()
        const thisYear = new Date().getFullYear()

        const monthlyExports = get().exports.filter((exp) => {
          const exportDate = new Date(exp.createdAt)
          return exportDate.getMonth() === thisMonth && exportDate.getFullYear() === thisYear
        })

        return monthlyExports.length < limits.monthly
      },

      getExportLimits: (userTier: number) => {
        switch (userTier) {
          case 1: // Premium+
            return {
              monthly: 999999, // Unlimited
              formats: ["tailwind", "css", "react", "figma", "zip"],
            }
          case 2: // Premium Lite
            return {
              monthly: 50,
              formats: ["tailwind", "css", "react"],
            }
          case 3: // Free
            return {
              monthly: 5,
              formats: ["css"],
            }
          default:
            return {
              monthly: 0,
              formats: [],
            }
        }
      },
    }),
    {
      name: "themevault-exports",
      partialize: (state) => ({
        exports: state.exports,
      }),
    },
  ),
)
