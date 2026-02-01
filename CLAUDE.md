# CLAUDE.md

## Project Overview

**Aidamo Platform** — A paid subscription service providing access to "Alex Aidamo," an AI-based negotiation support tool powered by Delphi.

- **Domain**: aidamo.ai
- **Pricing**: $35/month subscription
- **Target users**: Executives, operators, dealmakers

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Auth + Database)
- Stripe (Checkout + Billing Portal + Webhooks)

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── access/page.tsx       # Paywalled Delphi embed (subscribers only)
│   ├── account/page.tsx      # Account management
│   ├── success/page.tsx      # Post-checkout confirmation
│   ├── cancel/page.tsx       # Checkout cancelled
│   ├── privacy/page.tsx      # Privacy policy
│   ├── terms/page.tsx        # Terms of service
│   └── api/
│       ├── auth/callback/    # Supabase auth callback
│       └── stripe/
│           ├── create-checkout/  # Creates Stripe checkout session
│           ├── create-portal/    # Creates Stripe billing portal session
│           └── webhook/          # Handles Stripe webhook events
├── components/
│   ├── auth-modal.tsx        # Magic link sign-in modal
│   ├── checkout-button.tsx   # Initiates checkout flow
│   ├── manage-billing-button.tsx
│   └── sign-out-button.tsx
├── lib/
│   ├── stripe.ts             # Stripe client (lazy initialized)
│   └── supabase/
│       ├── client.ts         # Browser client
│       ├── server.ts         # Server client (cookies)
│       └── admin.ts          # Service role client
└── middleware.ts             # Auth protection for /access, /account
```

## Key Files

- `supabase-schema.sql` — Database schema (run in Supabase SQL Editor)
- `.env.example` — Required environment variables

## Brand Guidelines

- **Aesthetic**: Sleek, minimalist, calm, executive
- **Colors**: Black, white, neutral greys only
- **Tone**: No hype language, no emojis
- **Delphi branding**: Must NOT appear on public pages; only visible inside the embed on /access

## Important Constraints

1. **Do NOT touch**: `/aidamo-ai` or `/ncortex` folders — those are separate projects
2. **Paywall**: `/access` is gated server-side; inactive users redirect to `/`
3. **No custom chat UI**: The /access page contains ONLY the Delphi embed, no sidebars or extra features
4. **Stripe lazy init**: `getStripe()` function is used to avoid build-time errors

## Subscription Flow

1. User clicks "Access for $35/month" → auth modal if not signed in
2. Magic link email sent → user clicks link → redirected to Stripe Checkout
3. After payment → Stripe webhook updates `subscription_status` in Supabase
4. User can now access /access page

## Stripe Webhook Events

- `checkout.session.completed` — Initial subscription created
- `customer.subscription.created` — Subscription active
- `customer.subscription.updated` — Status changes
- `customer.subscription.deleted` — Subscription cancelled

## Database Schema (Supabase)

```sql
profiles (
  id uuid PRIMARY KEY,        -- matches auth.users.id
  email text,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text    -- 'active' | 'inactive'
)
```

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Local Stripe Testing

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET` in `.env.local`.
