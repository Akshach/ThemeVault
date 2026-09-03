import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const session = AuthService.verifyToken(token)
    if (!session) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await AuthService.getUserById(session.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        tier: user.tier,
        exportsUsed: user.exportsUsed,
        exportsLimit: user.exportsLimit,
        isActive: user.isActive,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
