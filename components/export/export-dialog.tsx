"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Code,
  Palette,
  Package,
  ExternalLink,
  Copy,
  Check,
  Loader2,
  AlertTriangle,
  Crown,
  Zap,
} from "lucide-react"
import type { ThemeConfig } from "@/lib/themes"
import type { ExportOptions } from "@/lib/export-generator"
import { useExport } from "@/hooks/use-export"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

interface ExportDialogProps {
  theme: ThemeConfig | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportDialog({ theme, open, onOpenChange }: ExportDialogProps) {
  const { user } = useAuth()
  const { exportTheme, isExporting, canExport, getExportLimits } = useExport()
  const [selectedFormat, setSelectedFormat] = useState<ExportOptions["format"]>("css")
  const [includeComponents, setIncludeComponents] = useState(true)
  const [includeDocumentation, setIncludeDocumentation] = useState(true)
  const [exportResult, setExportResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  if (!theme || !user) return null

  const limits = getExportLimits(user.tier)
  const canUserExport = canExport(user.tier)
  const hasFormatAccess = limits.formats.includes(selectedFormat)

  const formatOptions = [
    {
      id: "css" as const,
      name: "CSS Variables",
      description: "Custom properties for any framework",
      icon: Palette,
      tier: 3,
      size: "2-5KB",
    },
    {
      id: "tailwind" as const,
      name: "Tailwind Config",
      description: "Ready-to-use Tailwind configuration",
      icon: Code,
      tier: 2,
      size: "3-8KB",
    },
    {
      id: "react" as const,
      name: "React Components",
      description: "Theme provider and utilities",
      icon: Code,
      tier: 2,
      size: "5-15KB",
    },
    {
      id: "figma" as const,
      name: "Figma File",
      description: "Design system and components",
      icon: ExternalLink,
      tier: 1,
      size: "Link",
    },
    {
      id: "zip" as const,
      name: "Complete Package",
      description: "All formats bundled together",
      icon: Package,
      tier: 1,
      size: "10-30KB",
    },
  ]

  const handleExport = async () => {
    if (!theme || !hasFormatAccess || !canUserExport) return

    try {
      const options: ExportOptions = {
        format: selectedFormat,
        includeComponents,
        includeDocumentation,
        watermark: user.tier === 3, // Free tier gets watermarks
      }

      const result = await exportTheme(theme, options)
      setExportResult(result)

      // Update user usage
      if (user.updateUsage) {
        user.updateUsage({
          exportsThisMonth: user.usage.exportsThisMonth + 1,
        })
      }
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  const handleDownload = () => {
    if (!exportResult) return

    const element = document.createElement("a")
    element.setAttribute("href", exportResult.downloadUrl)
    element.setAttribute("download", exportResult.name)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleCopy = async () => {
    if (!exportResult) return

    try {
      await navigator.clipboard.writeText(exportResult.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const getTierIcon = (tier: number) => {
    switch (tier) {
      case 1:
        return Crown
      case 2:
        return Zap
      default:
        return null
    }
  }

  const getTierLabel = (tier: number) => {
    switch (tier) {
      case 1:
        return "Premium+"
      case 2:
        return "Premium Lite"
      default:
        return "Free"
    }
  }

  if (exportResult) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              Export Complete
            </DialogTitle>
            <DialogDescription>Your {theme.name} theme has been exported successfully</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">{exportResult.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exportResult.format.toUpperCase()} • {exportResult.size}
                    </p>
                  </div>
                  <Badge variant="outline">{selectedFormat}</Badge>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleDownload} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={handleCopy} variant="outline">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {user.tier === 3 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>Free tier exports include watermarks. Upgrade to remove them.</AlertDescription>
              </Alert>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export {theme.name}</DialogTitle>
          <DialogDescription>Choose your export format and options</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="format" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>

          <TabsContent value="format" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {formatOptions.map((format) => {
                const Icon = format.icon
                const TierIcon = getTierIcon(format.tier)
                const hasAccess = user.tier <= format.tier
                const isSelected = selectedFormat === format.id

                return (
                  <Card
                    key={format.id}
                    className={cn(
                      "cursor-pointer transition-all",
                      isSelected && "ring-2 ring-primary",
                      !hasAccess && "opacity-50",
                    )}
                    onClick={() => hasAccess && setSelectedFormat(format.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <div>
                            <p className="font-medium">{format.name}</p>
                            <p className="text-sm text-muted-foreground">{format.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">{format.size}</span>
                          {TierIcon && (
                            <Badge variant="outline" className="text-xs">
                              <TierIcon className="w-3 h-3 mr-1" />
                              {getTierLabel(format.tier)}
                            </Badge>
                          )}
                          {!hasAccess && (
                            <Badge variant="secondary" className="text-xs">
                              Upgrade Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="options" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="components"
                  checked={includeComponents}
                  onCheckedChange={setIncludeComponents}
                  disabled={user.tier === 3}
                />
                <Label htmlFor="components" className="text-sm">
                  Include component examples
                  {user.tier === 3 && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      Premium
                    </Badge>
                  )}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="docs" checked={includeDocumentation} onCheckedChange={setIncludeDocumentation} />
                <Label htmlFor="docs" className="text-sm">
                  Include documentation
                </Label>
              </div>

              {user.tier === 3 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>Free tier exports include watermarks and limited options.</AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {canUserExport
              ? `${limits.monthly - user.usage.exportsThisMonth} exports remaining this month`
              : "Export limit reached for this month"}
          </div>

          <Button onClick={handleExport} disabled={isExporting || !hasFormatAccess || !canUserExport}>
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export {selectedFormat.toUpperCase()}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
