# CLAUDE.md

## Project Overview

**Aidamo Platform** — Landing page and access portal for AIDAMO, Alex Adamo's Negotiation Intelligence powered by Delphi.

- **Domain**: aidamo.ai
- **Pricing**: Freemium (handled by Delphi)
- **Target users**: Executives, operators, dealmakers

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Delphi AI embed

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── access/page.tsx       # Delphi embed (direct access)
│   ├── privacy/page.tsx      # Privacy policy
│   ├── terms/page.tsx        # Terms of service
│   └── layout.tsx            # Root layout
└── globals.css               # Tailwind styles
```

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, CTA |
| `/access` | Delphi embed (Alex Adamo AI) |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Brand Guidelines

- **Aesthetic**: Sleek, minimalist, calm, executive
- **Colors**: Black, white, neutral greys only
- **Tone**: No hype language, no emojis
- **Delphi branding**: Only visible inside the embed on /access

## Important Constraints

1. **Do NOT touch**: `/aidamo-ai` or `/ncortex` folders — those are separate projects
2. **No paywall**: Direct access to /access page; Delphi handles usage limits
3. **No custom chat UI**: The /access page contains ONLY the Delphi embed

## Delphi Integration

The Delphi embed is loaded via their JavaScript SDK:

```tsx
<Script id="delphi-page-script" strategy="afterInteractive">
  {`
    window.delphi = {...(window.delphi ?? {}) };
    window.delphi.page = {
      config: "b2562f71-9f94-4057-8e8f-c16f4b28e8cc",
      overrides: { landingPage: "OVERVIEW" },
      container: { width: "100%", height: "800px" },
    };
  `}
</Script>
<Script src="https://embed.delphi.ai/loader.js" strategy="afterInteractive" />
```

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Deploy to Vercel:

```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.
