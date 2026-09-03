import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await AuthService.authenticateUser(email, password)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = AuthService.generateToken(user)

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.userId,
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
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
