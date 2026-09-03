import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { AuthProvider } from "@/hooks/use-auth"
import { ThemeApplier } from "@/components/theme-applier"
import { ThemeProvider } from "next-themes"
import "./globals.css"

export const metadata: Metadata = {
  title: "ThemeVault",
  description: "Explore and apply beautiful UI themes with ThemeVault",
  icons: {
    icon: "/themevault-logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ThemeApplier />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
