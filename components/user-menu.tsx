"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, Settings, CreditCard, LogOut, Crown, Zap, Gift, Calendar, Download } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { SignInDialog } from "@/components/auth/sign-in-dialog"

export function UserMenu() {
  const { user, isAuthenticated, signOut } = useAuth()
  const [showSignIn, setShowSignIn] = useState(false)
  const [showAccount, setShowAccount] = useState(false)

  const getTierIcon = (tier: number) => {
    switch (tier) {
      case 1:
        return Crown
      case 2:
        return Zap
      case 3:
        return Gift
      default:
        return Gift
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

  if (!isAuthenticated || !user) {
    return (
      <>
        <Button onClick={() => setShowSignIn(true)}>Sign In</Button>
        <SignInDialog open={showSignIn} onOpenChange={setShowSignIn} />
      </>
    )
  }

  const TierIcon = getTierIcon(user.tier)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-80" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <Badge className={getTierColor(user.tier)}>
                  <TierIcon className="w-3 h-3 mr-1" />
                  {getTierLabel(user.tier)}
                </Badge>
              </div>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Usage Stats */}
          <div className="p-2">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Themes Used</span>
                <span>{user.usage.themesUsed}/∞</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Exports This Month</span>
                <span>
                  {user.usage.exportsThisMonth}/{user.tier === 3 ? "5" : user.tier === 2 ? "50" : "∞"}
                </span>
              </div>
              {user.tier < 3 && (
                <Progress value={user.tier === 2 ? (user.usage.exportsThisMonth / 50) * 100 : 100} className="h-1" />
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setShowAccount(true)}>
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Account Details Dialog */}
      <Dialog open={showAccount} onOpenChange={setShowAccount}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Account Details</DialogTitle>
            <DialogDescription>Manage your ThemeVault account and subscription</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* User Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <TierIcon className="w-5 h-5 mr-2" />
                  {getTierLabel(user.tier)} Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.subscription ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Status</span>
                      <Badge variant={user.subscription.status === "active" ? "default" : "secondary"}>
                        {user.subscription.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next billing</span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    You're on the free plan. Upgrade to access premium themes.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Themes accessed</span>
                  <span>{user.usage.themesUsed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Exports this month</span>
                  <span className="flex items-center">
                    <Download className="w-3 h-3 mr-1" />
                    {user.usage.exportsThisMonth}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
