"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeSelector } from "@/components/theme-selector"
import { UserMenu } from "@/components/user-menu"
import { useThemeVault } from "@/hooks/use-theme-vault"
import { useAuth } from "@/hooks/use-auth"
import { Palette, Code, Download, Zap, Star, Users, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { applyThemeToDocument, currentTheme } = useThemeVault()
  const { user } = useAuth()

  const isAdmin = user?.email === "admin@themevault.com" || user?.role === "admin"

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
            <div className="flex items-center space-x-2">
              <img src="/themevault-logo.png" alt="ThemeVault" className="h-10 w-auto object-contain" />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/pricing">Pricing</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/gallery">Gallery</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/playground">Playground</Link>
              </Button>
              {isAdmin && (
                <Button variant="ghost" asChild>
                  <Link href="/admin">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                </Button>
              )}
              {/* Replaced sign in button with user menu */}
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            Developer-First SaaS Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Transform Your UI
            <br />
            Instantly
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Preview your entire application in multiple premium UI themes. Copy production-ready code with Tailwind CSS,
            shadcn/ui, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/gallery">
                <Zap className="w-5 h-5 mr-2" />
                Browse Themes
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/playground">
                <Code className="w-5 h-5 mr-2" />
                Try Playground
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ThemeVault?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for developers who want premium designs without the design work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Instant Preview</CardTitle>
                <CardDescription>See your entire app transform in real-time as you switch themes</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Code className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Production Ready</CardTitle>
                <CardDescription>Export clean Tailwind CSS, React components, and Figma files</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Download className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Multiple Formats</CardTitle>
                <CardDescription>Get your themes as code, design files, or complete packages</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Theme Selector Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <ThemeSelector />
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold">10,000+ Developers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="w-5 h-5 text-primary" />
              <span className="font-semibold">50,000+ Downloads</span>
            </div>
          </div>
          <p className="text-muted-foreground">Trusted by developers at top companies worldwide</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/themevault-logo.png" alt="ThemeVault" className="h-8 w-auto object-contain" />
            </div>
            <p className="text-muted-foreground">© 2024 ThemeVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
