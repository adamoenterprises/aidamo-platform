# Aidamo Platform

Paid access to Alex Aidamo — AI-based negotiation support built on Alex Adamo's methodology.

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Auth + Database)
- Stripe (Checkout + Billing Portal)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (starts with `sk_`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (starts with `whsec_`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (starts with `pk_`) |
| `STRIPE_PRICE_ID` | ID of your $35/month subscription price |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `NEXT_PUBLIC_APP_URL` | Your app URL (e.g., `http://localhost:3000`) |

### 3. Supabase setup

1. Create a new Supabase project
2. Go to SQL Editor and run the contents of `supabase-schema.sql`
3. Enable Email (Magic Link) auth in Authentication → Providers
4. Copy your project URL and keys to `.env.local`

### 4. Stripe setup

1. Create a product in Stripe Dashboard
2. Create a $35/month recurring price
3. Copy the price ID to `STRIPE_PRICE_ID`
4. Set up Billing Portal in Stripe Dashboard → Settings → Billing → Customer portal

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Stripe webhook setup (local development)

Install the Stripe CLI and run:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

## Deployment (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Add all environment variables
4. Set `NEXT_PUBLIC_APP_URL` to your production domain
5. Add webhook endpoint in Stripe Dashboard:
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`

## Adding Delphi Embed

After deployment, edit `src/app/access/page.tsx` and replace the placeholder in the `delphi-embed` div with your actual Delphi embed code.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/access` | Paywalled Delphi embed (active subscription required) |
| `/account` | Account management |
| `/success` | Post-checkout confirmation |
| `/cancel` | Checkout cancelled |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
