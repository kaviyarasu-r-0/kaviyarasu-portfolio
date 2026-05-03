import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Review from '@/models/Review'
import { isAuthenticated } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  try {
    await dbConnect()
    const body = await req.json()
    const review = await Review.findByIdAndUpdate(params.id, body, { new: true })
    return NextResponse.json({ success: true, data: review })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  try {
    await dbConnect()
    await Review.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true, message: 'Review deleted' })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}
