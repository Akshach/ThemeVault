"use client"

import { useEffect } from "react"
import { ThemeGallery } from "@/components/theme-gallery"
import { useThemeVault } from "@/hooks/use-theme-vault"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Palette } from "lucide-react"
import Link from "next/link"

export default function GalleryPage() {
  const { applyThemeToDocument, currentTheme } = useThemeVault()

  useEffect(() => {
    // Apply the current theme on mount
    applyThemeToDocument(currentTheme)
  }, [applyThemeToDocument, currentTheme])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <img src="/themevault-logo.png" alt="ThemeVault Gallery" className="h-10 w-auto object-contain" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">Documentation</Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <ThemeGallery />
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-4 mt-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/themevault-logo.png" alt="ThemeVault" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-muted-foreground text-sm">© 2024 ThemeVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
