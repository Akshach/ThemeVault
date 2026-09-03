"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Settings,
  Palette,
  Type,
  Layout,
  Download,
  Code,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  Copy,
  Check,
} from "lucide-react"
import { useThemeVault } from "@/hooks/use-theme-vault"
import { getThemeById, themes } from "@/lib/themes"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { TIER_CONFIG } from "@/lib/models/User"

interface ThemePlaygroundProps {
  className?: string
}

export function ThemePlayground({ className }: ThemePlaygroundProps) {
  const { user } = useAuth()
  const { currentTheme, setPreviewTheme, canAccessTheme } = useThemeVault()
  const [viewportSize, setViewportSize] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const [showControls, setShowControls] = useState(true)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [customizations, setCustomizations] = useState({
    fontSize: [16],
    spacing: [1],
    borderRadius: [8],
    animationSpeed: [1],
  })

  const theme = getThemeById(currentTheme)
  const isAccessible = theme ? canAccessTheme(theme) : false
  const userTier = user?.tier || "free"
  const accessibleThemes = themes.filter((t) => canAccessTheme(t))

  const handleThemeChange = useCallback(
    (themeId: string) => {
      const selectedTheme = getThemeById(themeId)
      if (selectedTheme && canAccessTheme(selectedTheme)) {
        setPreviewTheme(themeId)
      }
    },
    [setPreviewTheme, canAccessTheme],
  )

  const copyToClipboard = useCallback(async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(type)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const generateThemeCSS = useCallback(() => {
    if (!theme) return ""

    const colorVariables = Object.entries(theme.tokens.colors)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n")

    return `/* ${theme.name} Theme */
:root {
${colorVariables}
  --radius: ${theme.tokens.borderRadius};
}

body {
  font-family: ${theme.tokens.fonts.sans};
  font-size: ${customizations.fontSize[0]}px;
  line-height: 1.5;
}

.theme-spacing {
  --spacing-scale: ${customizations.spacing[0]};
}

.theme-radius {
  --radius: ${customizations.borderRadius[0]}px;
}`
  }, [theme, customizations])

  const getViewportClass = () => {
    switch (viewportSize) {
      case "mobile":
        return "max-w-sm mx-auto"
      case "tablet":
        return "max-w-2xl mx-auto"
      case "desktop":
        return "w-full"
      default:
        return "w-full"
    }
  }

  const SampleContent = () => (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sample Application</h1>
          <p className="text-muted-foreground">Testing the {theme?.name} theme</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Secondary</Button>
          <Button>Primary Action</Button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Feature Card</CardTitle>
            <CardDescription>This is a sample card to test the theme</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <Button size="sm" className="w-full">
              Learn More
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Progress</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Sample input" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Badges and Tags */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Components</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      {/* Sample Form */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>Test form elements with the current theme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." />
          </div>
          <Button className="w-full">Send Message</Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className={cn("flex h-screen bg-background", className)}>
      {/* Controls Panel */}
      {showControls && (
        <div className="w-80 border-r bg-card/50 backdrop-blur-sm overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Theme Playground</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowControls(false)}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Customize and test your theme</p>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Select Theme</h3>
              <Select value={currentTheme} onValueChange={handleThemeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a theme" />
                </SelectTrigger>
                <SelectContent>
                  {accessibleThemes.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      <div className="flex items-center gap-2">
                        <span>{t.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {t.tier}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Theme Info */}
            <div>
              <h3 className="font-medium mb-2">Current Theme</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{theme?.name}</span>
                  <Badge variant="outline">{theme?.category}</Badge>
                </div>
                <div className="text-xs text-muted-foreground">Tier: {TIER_CONFIG[userTier].name}</div>
              </div>
            </div>

            {/* Viewport Controls */}
            <div>
              <h3 className="font-medium mb-3">Viewport</h3>
              <div className="flex gap-1">
                <Button
                  variant={viewportSize === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewportSize("mobile")}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewportSize === "tablet" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewportSize("tablet")}
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewportSize === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewportSize("desktop")}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Customization Controls */}
            {isAccessible && (
              <Tabs defaultValue="typography" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="typography">
                    <Type className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="layout">
                    <Layout className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="colors">
                    <Palette className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="typography" className="space-y-4">
                  <div>
                    <Label>Font Size</Label>
                    <Slider
                      value={customizations.fontSize}
                      onValueChange={(value) => setCustomizations((prev) => ({ ...prev, fontSize: value }))}
                      max={24}
                      min={12}
                      step={1}
                      className="mt-2"
                    />
                    <span className="text-xs text-muted-foreground">{customizations.fontSize[0]}px</span>
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="space-y-4">
                  <div>
                    <Label>Spacing Scale</Label>
                    <Slider
                      value={customizations.spacing}
                      onValueChange={(value) => setCustomizations((prev) => ({ ...prev, spacing: value }))}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="mt-2"
                    />
                    <span className="text-xs text-muted-foreground">{customizations.spacing[0]}x</span>
                  </div>

                  <div>
                    <Label>Border Radius</Label>
                    <Slider
                      value={customizations.borderRadius}
                      onValueChange={(value) => setCustomizations((prev) => ({ ...prev, borderRadius: value }))}
                      max={20}
                      min={0}
                      step={1}
                      className="mt-2"
                    />
                    <span className="text-xs text-muted-foreground">{customizations.borderRadius[0]}px</span>
                  </div>
                </TabsContent>

                <TabsContent value="colors" className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {theme &&
                      Object.entries(theme.tokens.colors)
                        .slice(0, 6)
                        .map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border" style={{ backgroundColor: value }} />
                            <span className="text-xs capitalize">{key}</span>
                          </div>
                        ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}

            <div className="space-y-3">
              <h3 className="font-medium">Export & Copy</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => copyToClipboard(generateThemeCSS(), "css")}
                >
                  {copiedCode === "css" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy CSS Variables
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Code className="w-4 h-4 mr-2" />
                  Export Full Code
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download Assets
                </Button>
              </div>
            </div>

            {/* Usage Info */}
            {user && (
              <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded">
                <div>
                  Exports used: {user.exportsUsed}/{user.exportsLimit === -1 ? "∞" : user.exportsLimit}
                </div>
                <div>Tier: {TIER_CONFIG[userTier].name}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Area */}
      <div className="flex-1 overflow-auto">
        {!showControls && (
          <div className="fixed top-4 left-4 z-50">
            <Button variant="outline" size="sm" onClick={() => setShowControls(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Controls
            </Button>
          </div>
        )}

        <div className={cn("min-h-full transition-all duration-300", getViewportClass())}>
          <SampleContent />
        </div>
      </div>
    </div>
  )
}
