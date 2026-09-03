import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getDatabase } from "./mongodb"
import type { User, UserSession, UserTier } from "./models/User"
import { ObjectId } from "mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret"

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static generateToken(user: UserSession): string {
    return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" })
  }

  static verifyToken(token: string): UserSession | null {
    try {
      return jwt.verify(token, JWT_SECRET) as UserSession
    } catch {
      return null
    }
  }

  static async createUser(email: string, password: string, name: string, tier: UserTier = "free"): Promise<User> {
    const db = await getDatabase()
    const users = db.collection<User>("users")

    // Check if user exists
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      throw new Error("User already exists")
    }

    const hashedPassword = await this.hashPassword(password)
    const user: User = {
      email,
      password: hashedPassword,
      name,
      tier,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      exportsUsed: 0,
      exportsLimit: tier === "free" ? 3 : tier === "premium-lite" ? 50 : -1,
      themesAccessed: [],
      purchaseHistory: [],
    }

    const result = await users.insertOne(user)
    return { ...user, _id: result.insertedId }
  }

  static async authenticateUser(email: string, password: string): Promise<UserSession | null> {
    const db = await getDatabase()
    const users = db.collection<User>("users")

    const user = await users.findOne({ email, isActive: true })
    if (!user) return null

    const isValid = await this.verifyPassword(password, user.password)
    if (!isValid) return null

    // Update last login
    await users.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } })

    return {
      userId: user._id!.toString(),
      email: user.email,
      name: user.name,
      tier: user.tier,
      isActive: user.isActive,
    }
  }

  static async getUserById(userId: string): Promise<User | null> {
    const db = await getDatabase()
    const users = db.collection<User>("users")
    return users.findOne({ _id: new ObjectId(userId) })
  }

  static async upgradeTier(userId: string, newTier: UserTier, transactionId?: string): Promise<void> {
    const db = await getDatabase()
    const users = db.collection<User>("users")

    const tierConfig = {
      "premium-lite": { price: 29, exportsLimit: 50 },
      "premium-plus": { price: 79, exportsLimit: -1 },
    }

    const config = tierConfig[newTier as keyof typeof tierConfig]
    if (!config) throw new Error("Invalid tier")

    await users.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          tier: newTier,
          exportsLimit: config.exportsLimit,
          updatedAt: new Date(),
        },
        $push: {
          purchaseHistory: {
            tier: newTier,
            amount: config.price,
            date: new Date(),
            transactionId,
          },
        },
      },
    )
  }
}
