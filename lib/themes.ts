// Creating the missing themes configuration file
export interface ThemeConfig {
  id: string
  name: string
  tier: 1 | 2 | 3
  category: "dark" | "terminal" | "glass" | "brutalist" | "minimal" | "cyberpunk" | "corporate" | "creative"
  description: string
  preview: string
  tokens: {
    colors: Record<string, string>
    fonts: {
      sans: string
      mono: string
      display?: string
    }
    spacing: Record<string, string>
    borderRadius: string
    shadows: Record<string, string>
  }
}

export const themes: ThemeConfig[] = [
  // Tier 3 (Free) Themes
  {
    id: "light-minimal",
    name: "Light Minimal",
    tier: 3,
    category: "minimal",
    description: "Clean and simple light theme",
    preview: "/minimal-light-interface.png",
    tokens: {
      colors: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        primary: "oklch(0.205 0 0)",
        "primary-foreground": "oklch(0.985 0 0)",
        secondary: "oklch(0.97 0 0)",
        "secondary-foreground": "oklch(0.205 0 0)",
        accent: "oklch(0.646 0.222 41.116)",
        "accent-foreground": "oklch(1 0 0)",
        muted: "oklch(0.97 0 0)",
        "muted-foreground": "oklch(0.556 0 0)",
        border: "oklch(0.922 0 0)",
        card: "oklch(1 0 0)",
        "card-foreground": "oklch(0.145 0 0)",
      },
      fonts: {
        sans: "Inter, system-ui, sans-serif",
        mono: "JetBrains Mono, monospace",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: "0.5rem",
      shadows: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      },
    },
  },
  {
    id: "dark-minimal",
    name: "Dark Minimal",
    tier: 3,
    category: "dark",
    description: "Elegant dark theme with subtle accents",
    preview: "/dark-minimal-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.145 0 0)",
        foreground: "oklch(0.985 0 0)",
        primary: "oklch(0.985 0 0)",
        "primary-foreground": "oklch(0.205 0 0)",
        secondary: "oklch(0.269 0 0)",
        "secondary-foreground": "oklch(0.985 0 0)",
        accent: "oklch(0.488 0.243 264.376)",
        "accent-foreground": "oklch(0.985 0 0)",
        muted: "oklch(0.269 0 0)",
        "muted-foreground": "oklch(0.708 0 0)",
        border: "oklch(0.269 0 0)",
        card: "oklch(0.205 0 0)",
        "card-foreground": "oklch(0.985 0 0)",
      },
      fonts: {
        sans: "Inter, system-ui, sans-serif",
        mono: "JetBrains Mono, monospace",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: "0.5rem",
      shadows: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.2)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.3)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.4)",
      },
    },
  },
  {
    id: "corporate-clean",
    name: "Corporate Clean",
    tier: 3,
    category: "corporate",
    description: "Professional business theme",
    preview: "/corporate-professional-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.99 0 0)",
        foreground: "oklch(0.15 0 0)",
        primary: "oklch(0.25 0.08 240)",
        "primary-foreground": "oklch(0.99 0 0)",
        secondary: "oklch(0.95 0 0)",
        "secondary-foreground": "oklch(0.25 0 0)",
        accent: "oklch(0.55 0.15 200)",
        "accent-foreground": "oklch(0.99 0 0)",
        muted: "oklch(0.96 0 0)",
        "muted-foreground": "oklch(0.45 0 0)",
        border: "oklch(0.9 0 0)",
        card: "oklch(1 0 0)",
        "card-foreground": "oklch(0.15 0 0)",
      },
      fonts: {
        sans: "system-ui, -apple-system, sans-serif",
        mono: "Consolas, monospace",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: "0.25rem",
      shadows: {
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      },
    },
  },
  // Tier 2 (Premium Lite) Themes
  {
    id: "terminal-hacker",
    name: "Terminal Hacker",
    tier: 2,
    category: "terminal",
    description: "Retro terminal with green phosphor glow",
    preview: "/hacker-terminal-green.png",
    tokens: {
      colors: {
        background: "oklch(0.05 0 0)",
        foreground: "oklch(0.8 0.15 140)",
        primary: "oklch(0.9 0.2 140)",
        "primary-foreground": "oklch(0.05 0 0)",
        secondary: "oklch(0.1 0 0)",
        "secondary-foreground": "oklch(0.8 0.15 140)",
        accent: "oklch(0.7 0.25 60)",
        "accent-foreground": "oklch(0.05 0 0)",
        muted: "oklch(0.15 0 0)",
        "muted-foreground": "oklch(0.6 0.1 140)",
        border: "oklch(0.3 0.1 140)",
        card: "oklch(0.08 0 0)",
        "card-foreground": "oklch(0.8 0.15 140)",
      },
      fonts: {
        sans: "JetBrains Mono, Consolas, monospace",
        mono: "JetBrains Mono, Consolas, monospace",
        display: "JetBrains Mono, Consolas, monospace",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: "0",
      shadows: {
        sm: "0 0 5px rgb(0 255 65 / 0.3)",
        md: "0 0 10px rgb(0 255 65 / 0.4)",
        lg: "0 0 20px rgb(0 255 65 / 0.5)",
      },
    },
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    tier: 2,
    category: "glass",
    description: "Frosted glass with backdrop blur effects",
    preview: "/glassmorphism-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.95 0.02 240)",
        foreground: "oklch(0.2 0 0)",
        primary: "oklch(0.6 0.15 260)",
        "primary-foreground": "oklch(0.95 0 0)",
        secondary: "oklch(0.9 0.02 240 / 0.8)",
        "secondary-foreground": "oklch(0.2 0 0)",
        accent: "oklch(0.7 0.2 300)",
        "accent-foreground": "oklch(0.95 0 0)",
        muted: "oklch(0.85 0.02 240 / 0.6)",
        "muted-foreground": "oklch(0.4 0 0)",
        border: "oklch(0.8 0.05 240 / 0.3)",
        card: "oklch(0.98 0.01 240 / 0.7)",
        "card-foreground": "oklch(0.2 0 0)",
      },
      fonts: {
        sans: "Inter, system-ui, sans-serif",
        mono: "JetBrains Mono, monospace",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: "1rem",
      shadows: {
        sm: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)",
        md: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
        lg: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      },
    },
  },
  // Roastume-inspired playful theme
  {
    id: "playful-retro",
    name: "Playful Retro",
    tier: 2,
    category: "creative",
    description: "Fun retro design with rounded elements and warm colors",
    preview: "/playful-retro-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.85 0.05 180)",
        foreground: "oklch(0.2 0.02 30)",
        primary: "oklch(0.6 0.15 30)",
        "primary-foreground": "oklch(0.95 0.02 60)",
        secondary: "oklch(0.75 0.08 60)",
        "secondary-foreground": "oklch(0.2 0.02 30)",
        accent: "oklch(0.7 0.2 120)",
        "accent-foreground": "oklch(0.95 0.02 60)",
        muted: "oklch(0.8 0.03 180)",
        "muted-foreground": "oklch(0.4 0 0)",
        border: "oklch(0.3 0.05 30)",
        card: "oklch(0.9 0.03 60)",
        "card-foreground": "oklch(0.2 0.02 30)",
      },
      fonts: {
        sans: "Comic Neue, system-ui, sans-serif",
        mono: "JetBrains Mono, monospace",
        display: "Fredoka One, system-ui, sans-serif",
      },
      spacing: {
        xs: "0.75rem",
        sm: "1.25rem",
        md: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      borderRadius: "2rem",
      shadows: {
        sm: "0 4px 0px rgb(0 0 0 / 0.2)",
        md: "0 8px 0px rgb(0 0 0 / 0.3)",
        lg: "0 12px 0px rgb(0 0 0 / 0.4)",
      },
    },
  },

  // Ethos-inspired gradient theme
  {
    id: "gradient-ethereal",
    name: "Gradient Ethereal",
    tier: 1,
    category: "creative",
    description: "Soft gradients with ethereal floating elements",
    preview: "/gradient-ethereal-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.92 0.03 260)",
        foreground: "oklch(0.25 0.02 260)",
        primary: "oklch(0.6 0.2 280)",
        "primary-foreground": "oklch(0.95 0.02 280)",
        secondary: "oklch(0.85 0.05 240)",
        "secondary-foreground": "oklch(0.3 0.02 260)",
        accent: "oklch(0.7 0.25 320)",
        "accent-foreground": "oklch(0.95 0.02 320)",
        muted: "oklch(0.88 0.02 260)",
        "muted-foreground": "oklch(0.5 0.02 260)",
        border: "oklch(0.8 0.05 260)",
        card: "oklch(0.95 0.02 260)",
        "card-foreground": "oklch(0.25 0.02 260)",
      },
      fonts: {
        sans: "Inter, system-ui, sans-serif",
        mono: "JetBrains Mono, monospace",
        display: "Playfair Display, serif",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2.5rem",
        xl: "4rem",
      },
      borderRadius: "1.5rem",
      shadows: {
        sm: "0 4px 20px rgb(139 92 246 / 0.1)",
        md: "0 8px 40px rgb(139 92 246 / 0.15)",
        lg: "0 16px 60px rgb(139 92 246 / 0.2)",
      },
    },
  },

  // Windows XP Theme
  {
    id: "windows-xp",
    name: "Windows XP",
    tier: 2,
    category: "creative",
    description: "Nostalgic Windows XP with blue taskbar and classic buttons",
    preview: "/windows-xp-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.9 0.02 240)",
        foreground: "oklch(0.1 0 0)",
        primary: "oklch(0.45 0.15 240)",
        "primary-foreground": "oklch(0.95 0 0)",
        secondary: "oklch(0.85 0.02 240)",
        "secondary-foreground": "oklch(0.1 0 0)",
        accent: "oklch(0.6 0.2 120)",
        "accent-foreground": "oklch(0.95 0 0)",
        muted: "oklch(0.8 0.02 240)",
        "muted-foreground": "oklch(0.4 0 0)",
        border: "oklch(0.6 0.05 240)",
        card: "oklch(0.95 0.01 240)",
        "card-foreground": "oklch(0.1 0 0)",
      },
      fonts: {
        sans: "Tahoma, system-ui, sans-serif",
        mono: "Courier New, monospace",
        display: "Tahoma, system-ui, sans-serif",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
      borderRadius: "0.125rem",
      shadows: {
        sm: "inset -1px -1px 0px rgb(128 128 128), inset 1px 1px 0px rgb(255 255 255)",
        md: "inset -2px -2px 0px rgb(128 128 128), inset 2px 2px 0px rgb(255 255 255)",
        lg: "inset -3px -3px 0px rgb(128 128 128), inset 3px 3px 0px rgb(255 255 255)",
      },
    },
  },

  // macOS/iOS Theme
  {
    id: "macos-big-sur",
    name: "macOS Big Sur",
    tier: 2,
    category: "creative",
    description: "Clean macOS design with rounded corners and subtle shadows",
    preview: "/macos-big-sur-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.98 0 0)",
        foreground: "oklch(0.15 0 0)",
        primary: "oklch(0.55 0.2 240)",
        "primary-foreground": "oklch(0.98 0 0)",
        secondary: "oklch(0.94 0 0)",
        "secondary-foreground": "oklch(0.15 0 0)",
        accent: "oklch(0.6 0.25 30)",
        "accent-foreground": "oklch(0.98 0 0)",
        muted: "oklch(0.96 0 0)",
        "muted-foreground": "oklch(0.45 0 0)",
        border: "oklch(0.88 0 0)",
        card: "oklch(0.99 0 0)",
        "card-foreground": "oklch(0.15 0 0)",
      },
      fonts: {
        sans: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        mono: "SF Mono, Menlo, monospace",
        display: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: "0.75rem",
      shadows: {
        sm: "0 1px 3px rgb(0 0 0 / 0.1)",
        md: "0 4px 12px rgb(0 0 0 / 0.15)",
        lg: "0 8px 25px rgb(0 0 0 / 0.15)",
      },
    },
  },

  // Linux Terminal Theme
  {
    id: "linux-ubuntu",
    name: "Linux Ubuntu",
    tier: 2,
    category: "terminal",
    description: "Ubuntu-inspired orange and dark theme",
    preview: "/linux-ubuntu-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.12 0.02 30)",
        foreground: "oklch(0.9 0.02 60)",
        primary: "oklch(0.65 0.25 30)",
        "primary-foreground": "oklch(0.95 0 0)",
        secondary: "oklch(0.2 0.02 30)",
        "secondary-foreground": "oklch(0.9 0.02 60)",
        accent: "oklch(0.7 0.3 120)",
        "accent-foreground": "oklch(0.95 0 0)",
        muted: "oklch(0.25 0.02 30)",
        "muted-foreground": "oklch(0.7 0.02 60)",
        border: "oklch(0.4 0.05 30)",
        card: "oklch(0.18 0.02 30)",
        "card-foreground": "oklch(0.9 0.02 60)",
      },
      fonts: {
        sans: "Ubuntu, system-ui, sans-serif",
        mono: "Ubuntu Mono, monospace",
        display: "Ubuntu, system-ui, sans-serif",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: "0.25rem",
      shadows: {
        sm: "0 2px 4px rgb(0 0 0 / 0.3)",
        md: "0 4px 8px rgb(0 0 0 / 0.4)",
        lg: "0 8px 16px rgb(0 0 0 / 0.5)",
      },
    },
  },

  // Tier 1 (Premium+) Themes
  {
    id: "cyberpunk-neon",
    name: "Cyberpunk Neon",
    tier: 1,
    category: "cyberpunk",
    description: "Electric neon colors on dark backgrounds",
    preview: "/cyberpunk-neon-electric-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.08 0 0)",
        foreground: "oklch(0.95 0.05 300)",
        primary: "oklch(0.8 0.3 320)",
        "primary-foreground": "oklch(0.08 0 0)",
        secondary: "oklch(0.15 0.1 280)",
        "secondary-foreground": "oklch(0.9 0.2 320)",
        accent: "oklch(0.7 0.35 180)",
        "accent-foreground": "oklch(0.08 0 0)",
        muted: "oklch(0.2 0.05 280)",
        "muted-foreground": "oklch(0.7 0.1 300)",
        border: "oklch(0.4 0.2 320)",
        card: "oklch(0.12 0.05 280)",
        "card-foreground": "oklch(0.9 0.1 300)",
      },
      fonts: {
        sans: "Orbitron, system-ui, sans-serif",
        mono: "Share Tech Mono, monospace",
        display: "Orbitron, system-ui, sans-serif",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: "0.125rem",
      shadows: {
        sm: "0 0 10px rgb(255 0 255 / 0.3)",
        md: "0 0 20px rgb(0 255 255 / 0.4)",
        lg: "0 0 40px rgb(255 0 255 / 0.6)",
      },
    },
  },
  {
    id: "brutalist-bold",
    name: "Brutalist Bold",
    tier: 1,
    category: "brutalist",
    description: "Raw, bold typography with high contrast",
    preview: "/brutalist-typography-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.98 0 0)",
        foreground: "oklch(0.05 0 0)",
        primary: "oklch(0.05 0 0)",
        "primary-foreground": "oklch(0.98 0 0)",
        secondary: "oklch(0.9 0 0)",
        "secondary-foreground": "oklch(0.05 0 0)",
        accent: "oklch(0.6 0.3 30)",
        "accent-foreground": "oklch(0.98 0 0)",
        muted: "oklch(0.85 0 0)",
        "muted-foreground": "oklch(0.3 0 0)",
        border: "oklch(0.05 0 0)",
        card: "oklch(0.95 0 0)",
        "card-foreground": "oklch(0.05 0 0)",
      },
      fonts: {
        sans: "Arial Black, system-ui, sans-serif",
        mono: "Courier New, monospace",
        display: "Impact, Arial Black, sans-serif",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.75rem",
        md: "1.25rem",
        lg: "2rem",
        xl: "3.5rem",
      },
      borderRadius: "0",
      shadows: {
        sm: "4px 4px 0px rgb(0 0 0)",
        md: "8px 8px 0px rgb(0 0 0)",
        lg: "12px 12px 0px rgb(0 0 0)",
      },
    },
  },
  // SaaS-inspired premium theme
  {
    id: "saas-premium",
    name: "SaaS Premium",
    tier: 1,
    category: "corporate",
    description: "Modern SaaS design with sophisticated gradients",
    preview: "/saas-premium-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.02 0 0)",
        foreground: "oklch(0.95 0.02 240)",
        primary: "oklch(0.6 0.2 260)",
        "primary-foreground": "oklch(0.98 0 0)",
        secondary: "oklch(0.08 0.02 240)",
        "secondary-foreground": "oklch(0.9 0.02 240)",
        accent: "oklch(0.7 0.25 320)",
        "accent-foreground": "oklch(0.98 0 0)",
        muted: "oklch(0.12 0.02 240)",
        "muted-foreground": "oklch(0.7 0.02 240)",
        border: "oklch(0.2 0.05 240)",
        card: "oklch(0.05 0.02 240)",
        "card-foreground": "oklch(0.95 0.02 240)",
      },
      fonts: {
        sans: "Inter, system-ui, sans-serif",
        mono: "JetBrains Mono, monospace",
        display: "Cal Sans, Inter, system-ui, sans-serif",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: "0.5rem",
      shadows: {
        sm: "0 4px 6px rgb(139 92 246 / 0.1)",
        md: "0 10px 25px rgb(139 92 246 / 0.15)",
        lg: "0 20px 40px rgb(139 92 246 / 0.2)",
      },
    },
  },

  // Landbook-inspired creative theme
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    tier: 1,
    category: "creative",
    description: "Bold creative design with asymmetric layouts",
    preview: "/creative-portfolio-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.97 0.01 60)",
        foreground: "oklch(0.1 0 0)",
        primary: "oklch(0.4 0.2 0)",
        "primary-foreground": "oklch(0.98 0 0)",
        secondary: "oklch(0.9 0.05 60)",
        "secondary-foreground": "oklch(0.1 0 0)",
        accent: "oklch(0.6 0.3 340)",
        "accent-foreground": "oklch(0.98 0 0)",
        muted: "oklch(0.93 0.02 60)",
        "muted-foreground": "oklch(0.4 0 0)",
        border: "oklch(0.8 0.05 60)",
        card: "oklch(0.99 0.01 60)",
        "card-foreground": "oklch(0.1 0 0)",
      },
      fonts: {
        sans: "Helvetica Neue, system-ui, sans-serif",
        mono: "JetBrains Mono, monospace",
        display: "Playfair Display, serif",
      },
      spacing: {
        xs: "0.375rem",
        sm: "0.875rem",
        md: "1.375rem",
        lg: "2.25rem",
        xl: "3.75rem",
      },
      borderRadius: "0.125rem",
      shadows: {
        sm: "0 2px 8px rgb(0 0 0 / 0.08)",
        md: "0 8px 24px rgb(0 0 0 / 0.12)",
        lg: "0 16px 48px rgb(0 0 0 / 0.16)",
      },
    },
  },

  // Retro Gaming Theme
  {
    id: "retro-gaming",
    name: "Retro Gaming",
    tier: 1,
    category: "creative",
    description: "8-bit inspired with pixelated elements and neon colors",
    preview: "/retro-gaming-interface.png",
    tokens: {
      colors: {
        background: "oklch(0.08 0.05 280)",
        foreground: "oklch(0.9 0.1 60)",
        primary: "oklch(0.7 0.3 320)",
        "primary-foreground": "oklch(0.08 0.05 280)",
        secondary: "oklch(0.15 0.1 280)",
        "secondary-foreground": "oklch(0.9 0.1 60)",
        accent: "oklch(0.8 0.35 120)",
        "accent-foreground": "oklch(0.08 0.05 280)",
        muted: "oklch(0.2 0.05 280)",
        "muted-foreground": "oklch(0.7 0.1 60)",
        border: "oklch(0.6 0.2 320)",
        card: "oklch(0.12 0.05 280)",
        "card-foreground": "oklch(0.9 0.1 60)",
      },
      fonts: {
        sans: "Press Start 2P, monospace",
        mono: "Press Start 2P, monospace",
        display: "Press Start 2P, monospace",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: "0",
      shadows: {
        sm: "0 0 8px rgb(255 0 255 / 0.5)",
        md: "0 0 16px rgb(0 255 255 / 0.6)",
        lg: "0 0 32px rgb(255 255 0 / 0.7)",
      },
    },
  },
]

export const getThemeById = (id: string): ThemeConfig | undefined => {
  return themes.find((theme) => theme.id === id)
}

export const getThemesByTier = (tier: 1 | 2 | 3): ThemeConfig[] => {
  return themes.filter((theme) => theme.tier === tier)
}

export const getThemesByCategory = (category: ThemeConfig["category"]): ThemeConfig[] => {
  return themes.filter((theme) => theme.category === category)
}
