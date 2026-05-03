import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Review from '@/models/Review'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    await dbConnect()
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: reviews })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await dbConnect()
    const body = await req.json()
    const review = await Review.create(body)
    return NextResponse.json({ success: true, data: review }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create review' }, { status: 500 })
  }
}
