import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export async function GET() {
  const results: any = {}

  // 1. Check environment variables
  results.env = {
    MONGODB_URI: process.env.MONGODB_URI 
      ? `FOUND ✅ (starts with: ${process.env.MONGODB_URI.substring(0, 30)}...)` 
      : 'MISSING ❌',
    JWT_SECRET: process.env.JWT_SECRET ? 'FOUND ✅' : 'MISSING ❌',
  }

  // 2. Try to connect to MongoDB
  try {
    const MONGODB_URI = process.env.MONGODB_URI!
    if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined')

    await mongoose.connect(MONGODB_URI)
    results.mongodb = {
      status: 'Connected ✅',
      host: mongoose.connection.host,
      database: mongoose.connection.name,
      readyState: mongoose.connection.readyState,
    }
  } catch (error: any) {
    results.mongodb = {
      status: 'Failed ❌',
      error: error.message,
      type: error.name,
    }
  }

  return NextResponse.json(results, { status: 200 })
}