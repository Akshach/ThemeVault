import type { ObjectId } from "mongodb"

export type UserTier = "free" | "premium-lite" | "premium-plus" | "admin"

export interface User {
  _id?: ObjectId
  email: string
  password: string
  name: string
  tier: UserTier
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
  isActive: boolean

  // Usage tracking
  exportsUsed: number
  exportsLimit: number
  themesAccessed: string[]

  // Payment info (for lifetime purchases)
  purchaseHistory: {
    tier: UserTier
    amount: number
    date: Date
    transactionId?: string
  }[]
}

export interface UserSession {
  userId: string
  email: string
  name: string
  tier: UserTier
  isActive: boolean
}

// Tier configurations
export const TIER_CONFIG = {
  free: {
    name: "Free",
    price: 0,
    exportsLimit: 3,
    themesAccess: ["minimal-light", "dark-minimal", "corporate-professional"],
    features: ["3 theme exports", "Basic themes", "Watermarked exports"],
  },
  "premium-lite": {
    name: "Premium Lite",
    price: 29, // Lifetime
    exportsLimit: 50,
    themesAccess: [
      "minimal-light",
      "dark-minimal",
      "corporate-professional",
      "hacker-terminal",
      "cyberpunk-neon",
      "playful-retro",
      "gradient-ethereal",
    ],
    features: ["50 theme exports", "Premium themes", "No watermarks", "Figma files"],
  },
  "premium-plus": {
    name: "Premium+",
    price: 79, // Lifetime
    exportsLimit: -1, // Unlimited
    themesAccess: "all",
    features: ["Unlimited exports", "All themes", "Priority support", "Custom themes", "Team sharing"],
  },
  admin: {
    name: "Admin",
    price: 0,
    exportsLimit: -1,
    themesAccess: "all",
    features: ["Full access", "User management", "Theme management", "Analytics"],
  },
} as const
