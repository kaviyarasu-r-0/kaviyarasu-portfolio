import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Project from '@/models/Project'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    await dbConnect()
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 })
    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await dbConnect()
    const body = await req.json()
    const project = await Project.create(body)
    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 })
  }
}
