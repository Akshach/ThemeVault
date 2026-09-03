"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./use-auth"

export interface AdminUser {
  id: string
  email: string
  name: string
  tier: 1 | 2 | 3
  subscriptionStatus: "active" | "canceled" | "expired"
  joinDate: string
  lastActive: string
  usage: {
    exportsThisMonth: number
    themesUsed: number
  }
  totalSpent: number
}

export interface AdminStats {
  totalUsers: number
  activeSubscriptions: number
  monthlyRevenue: number
  totalExports: number
  popularThemes: Array<{
    id: string
    name: string
    exports: number
    tier: number
  }>
  recentActivity: Array<{
    id: string
    type: "signup" | "export" | "upgrade" | "cancel"
    user: string
    timestamp: string
    details: string
  }>
}

export function useAdmin() {
  const { user } = useAuth()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  const isAdmin = user?.email === "admin@themevault.com" || user?.role === "admin"

  useEffect(() => {
    if (isAdmin) {
      loadAdminData()
    }
  }, [isAdmin])

  const loadAdminData = async () => {
    setLoading(true)

    // Mock admin data - in real app, this would be API calls
    const mockUsers: AdminUser[] = [
      {
        id: "1",
        email: "john@example.com",
        name: "John Doe",
        tier: 2,
        subscriptionStatus: "active",
        joinDate: "2024-01-15",
        lastActive: "2024-01-20",
        usage: { exportsThisMonth: 15, themesUsed: 8 },
        totalSpent: 27,
      },
      {
        id: "2",
        email: "sarah@startup.com",
        name: "Sarah Wilson",
        tier: 1,
        subscriptionStatus: "active",
        joinDate: "2024-01-10",
        lastActive: "2024-01-19",
        usage: { exportsThisMonth: 45, themesUsed: 12 },
        totalSpent: 87,
      },
      {
        id: "3",
        email: "mike@freelance.com",
        name: "Mike Chen",
        tier: 3,
        subscriptionStatus: "expired",
        joinDate: "2024-01-05",
        lastActive: "2024-01-18",
        usage: { exportsThisMonth: 3, themesUsed: 3 },
        totalSpent: 0,
      },
    ]

    const mockStats: AdminStats = {
      totalUsers: 1247,
      activeSubscriptions: 892,
      monthlyRevenue: 18450,
      totalExports: 15678,
      popularThemes: [
        { id: "cyberpunk-neon", name: "Cyberpunk Neon", exports: 1234, tier: 1 },
        { id: "glassmorphism", name: "Glassmorphism", exports: 987, tier: 2 },
        { id: "terminal-hacker", name: "Terminal Hacker", exports: 756, tier: 2 },
        { id: "dark-minimal", name: "Dark Minimal", exports: 654, tier: 3 },
        { id: "brutalist-bold", name: "Brutalist Bold", exports: 543, tier: 1 },
      ],
      recentActivity: [
        {
          id: "1",
          type: "signup",
          user: "alex@dev.com",
          timestamp: "2024-01-20T10:30:00Z",
          details: "New user registration",
        },
        {
          id: "2",
          type: "upgrade",
          user: "sarah@startup.com",
          timestamp: "2024-01-20T09:15:00Z",
          details: "Upgraded to Premium+",
        },
        {
          id: "3",
          type: "export",
          user: "john@example.com",
          timestamp: "2024-01-20T08:45:00Z",
          details: "Exported Cyberpunk Neon theme",
        },
        {
          id: "4",
          type: "cancel",
          user: "old@user.com",
          timestamp: "2024-01-19T16:20:00Z",
          details: "Canceled Premium Lite subscription",
        },
      ],
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUsers(mockUsers)
    setStats(mockStats)
    setLoading(false)
  }

  const updateUserTier = async (userId: string, newTier: 1 | 2 | 3) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, tier: newTier } : user)))
  }

  const deleteUser = async (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
  }

  return {
    isAdmin,
    users,
    stats,
    loading,
    updateUserTier,
    deleteUser,
    refreshData: loadAdminData,
  }
}
