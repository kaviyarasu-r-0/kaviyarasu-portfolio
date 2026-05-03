import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-this'

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): jwt.JwtPayload | string {
  return jwt.verify(token, JWT_SECRET)
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  const cookieToken = req.cookies.get('admin-token')?.value
  return cookieToken || null
}

export function isAuthenticated(req: NextRequest): boolean {
  try {
    const token = getTokenFromRequest(req)
    if (!token) return false
    verifyToken(token)
    return true
  } catch {
    return false
  }
}
