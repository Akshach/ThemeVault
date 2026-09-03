"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  DollarSign,
  Download,
  TrendingUp,
  Crown,
  Zap,
  Shield,
  Activity,
  BarChart3,
  Trash2,
  Edit,
  Plus,
} from "lucide-react"
import { useAdmin } from "@/hooks/use-admin"
import { ThemeManager } from "./theme-manager"
import { cn } from "@/lib/utils"

export function AdminDashboard() {
  const { isAdmin, users, stats, loading, updateUserTier, deleteUser } = useAdmin()
  const [selectedTab, setSelectedTab] = useState("overview")

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>Access denied. Admin privileges required.</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
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

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1:
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case 2:
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "canceled":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage ThemeVault users, themes, and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Shield className="w-3 h-3 mr-1" />
            Admin Access
          </Badge>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.activeSubscriptions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(stats?.monthlyRevenue || 0)}</div>
                <p className="text-xs text-muted-foreground">+23% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Exports</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalExports.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Popular Themes & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Themes</CardTitle>
                <CardDescription>Most exported themes this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.popularThemes.map((theme, index) => {
                    const TierIcon = getTierIcon(theme.tier)
                    return (
                      <div key={theme.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{theme.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={getTierColor(theme.tier)} variant="outline">
                                {TierIcon && <TierIcon className="w-3 h-3 mr-1" />}
                                {getTierLabel(theme.tier)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{theme.exports}</p>
                          <p className="text-xs text-muted-foreground">exports</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          activity.type === "signup" && "bg-green-500",
                          activity.type === "upgrade" && "bg-blue-500",
                          activity.type === "export" && "bg-purple-500",
                          activity.type === "cancel" && "bg-red-500",
                        )}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">{activity.details}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">User Management</h2>
              <p className="text-muted-foreground">Manage user accounts and subscriptions</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => {
                    const TierIcon = getTierIcon(user.tier)
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTierColor(user.tier)}>
                            {TierIcon && <TierIcon className="w-3 h-3 mr-1" />}
                            {getTierLabel(user.tier)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.subscriptionStatus)}>{user.subscriptionStatus}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{user.usage.exportsThisMonth} exports</p>
                            <p className="text-muted-foreground">{user.usage.themesUsed} themes used</p>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(user.totalSpent)}</TableCell>
                        <TableCell>{formatDate(user.lastActive)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select
                              value={user.tier.toString()}
                              onValueChange={(value) => updateUserTier(user.id, Number.parseInt(value) as 1 | 2 | 3)}
                            >
                              <SelectTrigger className="w-24 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">Free</SelectItem>
                                <SelectItem value="2">Lite</SelectItem>
                                <SelectItem value="1">Pro</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="themes" className="space-y-6">
          <ThemeManager />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Analytics</h2>
            <p className="text-muted-foreground">Detailed insights and metrics</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Export Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Export trends over time
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  User Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Chart placeholder - User registration trends
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
