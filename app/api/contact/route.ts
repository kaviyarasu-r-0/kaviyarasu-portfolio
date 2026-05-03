import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Contact from '@/models/Contact'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 })
    }

    await Contact.create({ name, email, message })

    // Optional email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.EMAIL_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        })

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `New Contact: ${name} — Portfolio`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px;">
              <h2 style="color:#7c3aed">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p style="background:#f5f5f5; padding:12px; border-radius:8px;">${message}</p>
            </div>
          `,
        })
      } catch (emailError) {
        console.error('Email send failed:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Admin only endpoint
  try {
    await dbConnect()
    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: contacts })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 })
  }
}
