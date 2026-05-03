import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kaviyarasu.dev'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (email !== adminEmail) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }

    // For simple setup: plain password comparison
    // For production: use bcrypt - store hashed password in env
    const isValid = password === adminPassword
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }

    const token = signToken({ email, role: 'admin' })

    const response = NextResponse.json({ success: true, token })
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' })
  response.cookies.delete('admin-token')
  return response
}
