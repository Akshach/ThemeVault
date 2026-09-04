"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeSelector } from "@/components/theme-selector"
import { UserMenu } from "@/components/user-menu"
import { useThemeVault } from "@/hooks/use-theme-vault"
import { useAuth } from "@/hooks/use-auth"
import { themes } from "@/lib/themes"
import { ArrowUpRight, Check, Code2, Download, Layers3, MousePointer2, Play, Shield, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { applyThemeToDocument, currentTheme, previewTheme, setPreviewTheme } = useThemeVault()
  const { user } = useAuth()

  const isAdmin = user?.email === "admin@themevault.com" || user?.role === "admin"
  const activeTheme = themes.find((theme) => theme.id === (previewTheme ?? currentTheme)) ?? themes[0]
  const featuredThemes = themes.slice(0, 5)

  useEffect(() => {
    // Apply the current theme on mount
    applyThemeToDocument(currentTheme)
  }, [applyThemeToDocument, currentTheme])

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="landing-header sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img src="/themevault-logo.png" alt="ThemeVault" className="h-9 w-auto object-contain" />
            <span className="hidden text-sm font-semibold tracking-tight sm:block">THEMEVAULT <span className="font-normal text-muted-foreground">/ UI SYSTEMS</span></span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-3">
            <Button variant="ghost" asChild><Link href="/pricing">Pricing</Link></Button>
            <Button variant="ghost" asChild><Link href="/gallery">Gallery</Link></Button>
            <Button variant="ghost" asChild><Link href="/playground">Playground</Link></Button>
            {isAdmin && (
              <Button variant="ghost" asChild>
                <Link href="/admin">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              </Button>
            )}
            <UserMenu />
          </nav>
        </div>
      </header>

      <main>
        <section className="landing-hero relative mx-auto max-w-7xl px-5 pb-20 pt-14 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="relative z-10 max-w-xl">
              <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px w-8 bg-primary" />
                The visual layer for your next product
              </div>
              <h1 className="max-w-2xl text-5xl font-bold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-[5.9rem]">
                Ship a point of view.
                <span className="mt-3 block text-primary">Not another default UI.</span>
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">
                ThemeVault turns one functional interface into a collection of finished worlds. Preview, compare, and export a design direction before your first coffee gets cold.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 px-6 text-base" asChild>
                  <Link href="/gallery"><Sparkles /> Explore the vault <ArrowUpRight /></Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 border-foreground/20 bg-transparent px-6 text-base" asChild>
                  <Link href="/playground"><Play /> Open playground</Link>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Live theme switching</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Copy-ready code</span>
              </div>
            </div>

            <div className="relative z-10">
              <div className="landing-window rounded-[calc(var(--radius)+12px)] border border-foreground/15 bg-card p-2 shadow-2xl">
                <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-3">
                  <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><span className="h-2.5 w-2.5 rounded-full bg-green-400" /></div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Live canvas / {activeTheme.name}</span>
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-primary"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> LIVE</span>
                </div>
                <div className="relative overflow-hidden rounded-lg bg-muted/40 p-3 sm:p-5">
                  <img src={activeTheme.preview} alt={`${activeTheme.name} theme preview`} className="landing-preview relative z-10 aspect-[1.45] w-full rounded-md object-cover shadow-xl" />
                  <div className="absolute bottom-7 left-7 z-20 hidden items-center gap-2 rounded-full border border-white/30 bg-black/65 px-3 py-2 text-xs text-white backdrop-blur-md sm:flex"><MousePointer2 className="h-3.5 w-3.5" /> Click a theme to transform your app</div>
                </div>
                <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4">
                  <div><p className="text-xs font-semibold">Try a different direction</p><p className="text-[11px] text-muted-foreground">The whole interface updates instantly</p></div>
                  <div className="flex gap-1.5">
                    {featuredThemes.map((theme) => <button key={theme.id} type="button" aria-label={`Preview ${theme.name}`} title={theme.name} onClick={() => setPreviewTheme(theme.id)} className={`h-7 w-7 rounded-full border-2 border-background shadow-sm transition-transform hover:scale-110 ${activeTheme.id === theme.id ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : ""}`} style={{ background: theme.tokens.colors.primary }} />)}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-lg border border-foreground/10 bg-card px-4 py-3 shadow-lg sm:block"><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Current mode</p><p className="mt-1 text-sm font-bold">{activeTheme.category} / polished</p></div>
            </div>
          </div>
        </section>

        <section className="border-y border-foreground/10 bg-muted/20">
          <div className="mx-auto grid max-w-7xl gap-0 px-5 py-6 sm:grid-cols-3 lg:px-8">
            {[
              ["01", "Pick a direction", "Start with a visual language that already feels intentional."],
              ["02", "Make it yours", "Tune the details in the playground and see the full system respond."],
              ["03", "Take it home", "Export the tokens and components your team can ship today."],
            ].map(([number, title, description]) => <div key={number} className="border-foreground/10 px-0 py-4 sm:border-l sm:px-6 first:sm:border-l-0"><span className="font-mono text-xs text-primary">{number}</span><h2 className="mt-3 text-lg font-bold tracking-tight">{title}</h2><p className="mt-1 max-w-xs text-sm leading-6 text-muted-foreground">{description}</p></div>)}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The vault</p><h2 className="mt-3 text-4xl font-bold tracking-[-0.04em]">One app. Infinite attitudes.</h2></div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">Your product has a personality. Find the visual system that gives it a voice.</p>
          </div>
          <div>
            <ThemeSelector />
          </div>
        </section>

        <section className="landing-marquee border-y border-foreground/10 py-5">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:justify-between lg:px-8">
            <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Instant preview</span><span className="flex items-center gap-2"><Code2 className="h-4 w-4 text-primary" /> Tailwind native</span><span className="flex items-center gap-2"><Layers3 className="h-4 w-4 text-primary" /> 20+ systems</span><span className="flex items-center gap-2"><Download className="h-4 w-4 text-primary" /> Export ready</span>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-3"><img src="/themevault-logo.png" alt="ThemeVault" className="h-8 w-auto object-contain" /><span>Build a better first impression.</span></div>
        <p>© 2024 ThemeVault. All rights reserved.</p>
      </footer>
    </div>
  )
}
