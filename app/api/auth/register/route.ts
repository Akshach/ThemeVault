import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if this is the admin email
    const isAdmin = email === process.env.ADMIN_EMAIL
    const tier = isAdmin ? "admin" : "free"

    const user = await AuthService.createUser(email, password, name, tier)
    const token = AuthService.generateToken({
      userId: user._id!.toString(),
      email: user.email,
      name: user.name,
      tier: user.tier,
      isActive: user.isActive,
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        tier: user.tier,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Registration failed" }, { status: 400 })
  }
}
