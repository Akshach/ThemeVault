"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Lock, Eye, Check, Search, Filter, Maximize2, Star, Download, Code } from "lucide-react"
import { themes, type ThemeConfig } from "@/lib/themes"
import { useThemeVault } from "@/hooks/use-theme-vault"
import { ExportDialog } from "@/components/export/export-dialog"
import { ExportHistory } from "@/components/export/export-history"
import { cn } from "@/lib/utils"

interface ThemeGalleryProps {
  className?: string
}

export function ThemeGallery({ className }: ThemeGalleryProps) {
  const { currentTheme, previewTheme, userTier, isPreviewMode, setTheme, setPreviewTheme, canAccessTheme } =
    useThemeVault()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTier, setSelectedTier] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"name" | "tier" | "category">("tier")
  const [fullscreenTheme, setFullscreenTheme] = useState<ThemeConfig | null>(null)
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null)
  // Adding export dialog states
  const [exportTheme, setExportTheme] = useState<ThemeConfig | null>(null)
  const [showExportHistory, setShowExportHistory] = useState(false)

  const categories = useMemo(() => {
    const cats = Array.from(new Set(themes.map((theme) => theme.category)))
    return cats
  }, [])

  const filteredAndSortedThemes = useMemo(() => {
    const filtered = themes.filter((theme) => {
      const matchesSearch =
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || theme.category === selectedCategory
      const matchesTier = selectedTier === "all" || theme.tier.toString() === selectedTier

      return matchesSearch && matchesCategory && matchesTier
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "tier":
          return a.tier - b.tier
        case "category":
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedTier, sortBy])

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

  const handleFullscreen = (theme: ThemeConfig) => {
    setFullscreenTheme(theme)
    if (canAccessTheme(theme)) {
      setPreviewTheme(theme.id)
    }
  }

  const stopPreview = () => {
    setPreviewTheme(null)
  }

  const closeFullscreen = () => {
    setFullscreenTheme(null)
    setPreviewTheme(null)
  }

  // Adding export handlers
  const handleExport = (theme: ThemeConfig) => {
    setExportTheme(theme)
  }

  const ThemeCard = ({ theme, isCompact = false }: { theme: ThemeConfig; isCompact?: boolean }) => {
    const isAccessible = canAccessTheme(theme)
    const isActive = currentTheme === theme.id
    const isPreviewing = previewTheme === theme.id
    const isHovered = hoveredTheme === theme.id

    return (
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-200 cursor-pointer group",
          isActive && "ring-2 ring-primary",
          isPreviewing && "ring-2 ring-accent",
          !isAccessible && "opacity-60",
          isHovered && "scale-105 shadow-lg",
          isCompact ? "h-48" : "h-auto",
        )}
        onMouseEnter={() => setHoveredTheme(theme.id)}
        onMouseLeave={() => setHoveredTheme(null)}
      >
        <CardHeader className={cn("pb-2", isCompact && "p-3")}>
          <div className="flex items-center justify-between">
            <CardTitle className={cn("text-lg", isCompact && "text-sm")}>{theme.name}</CardTitle>
            <Badge className={getTierColor(theme.tier)}>{getTierLabel(theme.tier)}</Badge>
          </div>
          {!isCompact && <CardDescription>{theme.description}</CardDescription>}
        </CardHeader>

        <CardContent className={cn("space-y-4", isCompact && "p-3 pt-0 space-y-2")}>
          <div className={cn("aspect-video rounded-md overflow-hidden bg-muted relative", isCompact && "aspect-[4/3]")}>
            <img
              src={theme.preview || "/placeholder.svg"}
              alt={`${theme.name} preview`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                onClick={() => handleFullscreen(theme)}
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Full Preview
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            {isAccessible ? (
              <>
                <Button
                  onClick={() => handleThemeClick(theme)}
                  className="flex-1"
                  variant={isActive ? "default" : "outline"}
                  size={isCompact ? "sm" : "default"}
                >
                  {isActive ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Active
                    </>
                  ) : (
                    "Apply"
                  )}
                </Button>
                <Button onClick={() => handlePreview(theme)} variant="ghost" size={isCompact ? "sm" : "icon"}>
                  <Eye className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button disabled className="flex-1" size={isCompact ? "sm" : "default"}>
                <Lock className="w-4 h-4 mr-2" />
                {isCompact ? "Locked" : "Upgrade Required"}
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
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Theme Gallery</h1>
          <p className="text-muted-foreground">Discover and preview {themes.length} premium UI themes</p>
        </div>
        <div className="flex items-center gap-2">
          {isPreviewMode && (
            <Button onClick={stopPreview} variant="outline">
              Exit Preview
            </Button>
          )}
          {/* Adding export history button */}
          <Button onClick={() => setShowExportHistory(true)} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export History
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTier} onValueChange={setSelectedTier}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="3">Free</SelectItem>
              <SelectItem value="2">Premium Lite</SelectItem>
              <SelectItem value="1">Premium+</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: "name" | "tier" | "category") => setSortBy(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tier">Tier</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAndSortedThemes.length} of {themes.length} themes
        </p>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Your tier: {getTierLabel(userTier)}</span>
        </div>
      </div>

      {/* Theme Grid */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="compact">Compact View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedThemes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compact" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredAndSortedThemes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} isCompact />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty state */}
      {filteredAndSortedThemes.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No themes found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Fullscreen Preview Dialog */}
      <Dialog open={!!fullscreenTheme} onOpenChange={closeFullscreen}>
        <DialogContent className="max-w-6xl h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>{fullscreenTheme?.name}</span>
                <Badge className={getTierColor(fullscreenTheme?.tier || 3)}>
                  {getTierLabel(fullscreenTheme?.tier || 3)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {fullscreenTheme && canAccessTheme(fullscreenTheme) && (
                  <>
                    <Button
                      onClick={() => handleThemeClick(fullscreenTheme)}
                      variant={currentTheme === fullscreenTheme.id ? "default" : "outline"}
                      size="sm"
                    >
                      {currentTheme === fullscreenTheme.id ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Applied
                        </>
                      ) : (
                        "Apply Theme"
                      )}
                    </Button>
                    {/* Adding export button to fullscreen dialog */}
                    <Button onClick={() => handleExport(fullscreenTheme)} variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Code className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                  </>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 rounded-lg overflow-hidden bg-muted">
            <img
              src={fullscreenTheme?.preview || "/placeholder.svg"}
              alt={`${fullscreenTheme?.name} preview`}
              className="w-full h-full object-cover"
            />
          </div>

          {fullscreenTheme && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">{fullscreenTheme.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Category: {fullscreenTheme.category} • Tier: {getTierLabel(fullscreenTheme.tier)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">4.8 (124 reviews)</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Adding export dialog and history */}
      <ExportDialog theme={exportTheme} open={!!exportTheme} onOpenChange={() => setExportTheme(null)} />
      <ExportHistory open={showExportHistory} onOpenChange={setShowExportHistory} />
    </div>
  )
}
