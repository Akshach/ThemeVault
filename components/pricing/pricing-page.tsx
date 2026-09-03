"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star, Zap, Crown, Gift } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { TIER_CONFIG, type UserTier } from "@/lib/models/User"
import { cn } from "@/lib/utils"

interface PricingPageProps {
  className?: string
}

export function PricingPage({ className }: PricingPageProps) {
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  const plans = [
    {
      id: "free",
      name: "Free",
      tier: "free" as UserTier,
      icon: Gift,
      description: "Perfect for trying out ThemeVault",
      price: 0,
      popular: false,
      features: TIER_CONFIG.free.features,
      limitations: ["Limited theme access", "Export watermarks", "Basic support only"],
    },
    {
      id: "premium-lite",
      name: "Premium Lite",
      tier: "premium-lite" as UserTier,
      icon: Zap,
      description: "Great for individual developers",
      price: 29, // Lifetime
      popular: true,
      features: TIER_CONFIG["premium-lite"].features,
      limitations: ["No Premium+ themes", "Limited customization"],
    },
    {
      id: "premium-plus",
      name: "Premium+",
      tier: "premium-plus" as UserTier,
      icon: Crown,
      description: "For teams and agencies",
      price: 79, // Lifetime
      popular: false,
      features: TIER_CONFIG["premium-plus"].features,
      limitations: [],
    },
  ]

  const handleUpgrade = async (planTier: UserTier) => {
    if (!user || planTier === "free") return

    setIsProcessing(planTier)
    try {
      // In a real app, this would integrate with Stripe or another payment processor
      // For now, we'll simulate the upgrade process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // This would normally be handled by a webhook after successful payment
      console.log(`Upgrading to ${planTier}`)

      // Refresh user data after upgrade
      // await refreshUser()
    } catch (error) {
      console.error("Upgrade failed:", error)
    } finally {
      setIsProcessing(null)
    }
  }

  const getCurrentPlan = () => {
    return plans.find((plan) => plan.tier === user?.tier)
  }

  const getPrice = (plan: (typeof plans)[0]) => {
    if (plan.price === 0) return "Free"
    return `$${plan.price} lifetime`
  }

  return (
    <div className={cn("space-y-12", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="mb-4">
          Lifetime Pricing
        </Badge>
        <h1 className="text-4xl font-bold">Choose Your Perfect Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Pay once, own forever. All plans include lifetime access with no recurring fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon
          const isCurrentPlan = user?.tier === plan.tier
          const isProcessingThis = isProcessing === plan.tier

          return (
            <Card
              key={plan.id}
              className={cn(
                "relative overflow-hidden transition-all duration-200",
                plan.popular && "ring-2 ring-primary scale-105",
                isCurrentPlan && "bg-primary/5 border-primary",
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <CardHeader className={cn("text-center", plan.popular && "pt-12")}>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>

                <div className="space-y-2">
                  <div className="text-4xl font-bold">{getPrice(plan)}</div>
                  {plan.price > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      One-time payment
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}

                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center space-x-3 opacity-60">
                      <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleUpgrade(plan.tier)}
                  disabled={isCurrentPlan || isProcessingThis}
                >
                  {isProcessingThis ? (
                    "Processing..."
                  ) : isCurrentPlan ? (
                    <>
                      <Star className="w-4 h-4 mr-2" />
                      Current Plan
                    </>
                  ) : plan.tier === "free" ? (
                    "Get Started Free"
                  ) : (
                    `Get ${plan.name} - $${plan.price}`
                  )}
                </Button>

                {isCurrentPlan && user && (
                  <div className="text-center text-xs text-muted-foreground">
                    <p>
                      Exports used: {user.exportsUsed}/{user.exportsLimit === -1 ? "∞" : user.exportsLimit}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Feature Comparison */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Compare All Features</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4">Features</th>
                <th className="text-center py-4 px-4">Free</th>
                <th className="text-center py-4 px-4">Premium Lite</th>
                <th className="text-center py-4 px-4">Premium+</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "Theme Access",
                  free: "3 basic themes",
                  lite: "7 premium themes",
                  premium: "All 13+ themes",
                },
                { feature: "Exports", free: "3 per account", lite: "50 per account", premium: "Unlimited" },
                { feature: "Code Export", free: "Watermarked", lite: "Clean", premium: "Clean + Commercial" },
                { feature: "Figma Files", free: false, lite: true, premium: true },
                { feature: "OS Themes", free: false, lite: false, premium: true },
                { feature: "Priority Support", free: false, lite: false, premium: true },
                { feature: "Custom Requests", free: false, lite: false, premium: true },
              ].map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 px-4 font-medium">{row.feature}</td>
                  <td className="py-4 px-4 text-center">
                    {typeof row.free === "boolean" ? (
                      row.free ? (
                        <Check className="w-4 h-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      row.free
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {typeof row.lite === "boolean" ? (
                      row.lite ? (
                        <Check className="w-4 h-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      row.lite
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {typeof row.premium === "boolean" ? (
                      row.premium ? (
                        <Check className="w-4 h-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      row.premium
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <div className="space-y-4 text-left">
          <div>
            <h3 className="font-semibold mb-2">Is this really lifetime access?</h3>
            <p className="text-muted-foreground">
              Yes! Pay once and get lifetime access to your plan's features. No recurring fees, ever.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Can I upgrade later?</h3>
            <p className="text-muted-foreground">
              You can upgrade to a higher tier anytime and only pay the difference.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">What happens to my themes if I don't upgrade?</h3>
            <p className="text-muted-foreground">
              You'll keep access to all themes you've already exported, but won't be able to access higher-tier themes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
            <p className="text-muted-foreground">
              We offer a 30-day money-back guarantee for all paid plans. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
