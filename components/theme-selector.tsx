"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, Eye, Check } from "lucide-react"
import { themes, type ThemeConfig } from "@/lib/themes"
import { useThemeVault } from "@/hooks/use-theme-vault"
import { cn } from "@/lib/utils"

interface ThemeSelectorProps {
  className?: string
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { currentTheme, previewTheme, userTier, isPreviewMode, setTheme, setPreviewTheme, canAccessTheme } =
    useThemeVault()

  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null)

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1:
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case 2:
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case 3:
        return "bg-gray-200 text-gray-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const getTierLabel = (tier: number) => {
    switch (tier) {
      case 1:
        return "Premium+"
      case 2:
        return "Premium Lite"
      case 3:
        return "Free"
      default:
        return "Free"
    }
  }

  const handleThemeClick = (theme: ThemeConfig) => {
    if (canAccessTheme(theme)) {
      setTheme(theme.id)
    }
  }

  const handlePreview = (theme: ThemeConfig) => {
    if (canAccessTheme(theme)) {
      setPreviewTheme(theme.id)
    }
  }

  const stopPreview = () => {
    setPreviewTheme(null)
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Choose Your Theme</h2>
          <p className="text-muted-foreground">Transform your entire experience with premium UI themes</p>
        </div>
        {isPreviewMode && (
          <Button onClick={stopPreview} variant="outline">
            Exit Preview
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => {
          const isAccessible = canAccessTheme(theme)
          const isActive = currentTheme === theme.id
          const isPreviewing = previewTheme === theme.id
          const isHovered = hoveredTheme === theme.id

          return (
            <Card
              key={theme.id}
              className={cn(
                "relative overflow-hidden transition-all duration-200 cursor-pointer",
                isActive && "ring-2 ring-primary",
                isPreviewing && "ring-2 ring-accent",
                !isAccessible && "opacity-60",
                isHovered && "scale-105",
              )}
              onMouseEnter={() => setHoveredTheme(theme.id)}
              onMouseLeave={() => setHoveredTheme(null)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{theme.name}</CardTitle>
                  <Badge className={getTierColor(theme.tier)}>{getTierLabel(theme.tier)}</Badge>
                </div>
                <CardDescription>{theme.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="aspect-video rounded-md overflow-hidden bg-muted">
                  <img
                    src={theme.preview || "/placeholder.svg"}
                    alt={`${theme.name} preview`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex gap-2">
                  {isAccessible ? (
                    <>
                      <Button
                        onClick={() => handleThemeClick(theme)}
                        className="flex-1"
                        variant={isActive ? "default" : "outline"}
                      >
                        {isActive ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Active
                          </>
                        ) : (
                          "Apply Theme"
                        )}
                      </Button>
                      <Button onClick={() => handlePreview(theme)} variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button disabled className="flex-1">
                      <Lock className="w-4 h-4 mr-2" />
                      Upgrade Required
                    </Button>
                  )}
                </div>
              </CardContent>

              {!isAccessible && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Upgrade to access</p>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
