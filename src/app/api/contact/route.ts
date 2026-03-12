import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await request.json()
    const { name, email, company, honeypot } = body

    // Honeypot check — if filled, it's a bot
    if (honeypot) {
      return NextResponse.json({ success: true })
    }

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Send email via Resend
    await resend.emails.send({
      from: 'AIDAMO <onboarding@resend.dev>',
      to: 'aidamo@thecommercialiser.com',
      subject: `New Enterprise Enquiry from ${name} at ${company}`,
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}`,
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
