import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getStripe } from '@/lib/stripe'

export async function POST() {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Service not configured' }, { status: 503 })
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const stripe = getStripe()
    const adminClient = createAdminClient()

    if (!adminClient) {
      return NextResponse.json({ error: 'Service not configured' }, { status: 503 })
    }

    // Check if user already has a customer record
    const { data: profile } = await adminClient
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      // Create Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id

      // Save customer ID to profile
      await adminClient
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          stripe_customer_id: customerId,
          subscription_status: 'inactive',
        })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const redirect = searchParams.get('redirect')

  if (redirect === 'true') {
    try {
      const supabase = await createClient()
      if (!supabase) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?message=Service not configured`)
      }

      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?message=Please sign in`)
      }

      const stripe = getStripe()
      const adminClient = createAdminClient()

      if (!adminClient) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?message=Service not configured`)
      }

      // Check or create customer
      const { data: profile } = await adminClient
        .from('profiles')
        .select('stripe_customer_id')
        .eq('id', user.id)
        .single()

      let customerId = profile?.stripe_customer_id

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: {
            supabase_user_id: user.id,
          },
        })
        customerId = customer.id

        await adminClient
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email,
            stripe_customer_id: customerId,
            subscription_status: 'inactive',
          })
      }

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
        subscription_data: {
          metadata: {
            supabase_user_id: user.id,
          },
        },
      })

      return NextResponse.redirect(session.url!)
    } catch (error) {
      console.error('Checkout redirect error:', error)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?message=Checkout failed`)
    }
  }

  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
