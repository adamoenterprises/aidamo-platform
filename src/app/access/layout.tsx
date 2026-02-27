import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Access | AIDAMO',
  description: 'Access AIDAMO - AI-powered negotiation decision support.',
  alternates: {
    canonical: '/access',
  },
}

export default function AccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
