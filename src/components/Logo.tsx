interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm: { height: '0.75em', stroke: 38, gap: '0.05em' },
  md: { height: '0.75em', stroke: 36, gap: '0.05em' },
  lg: { height: '0.72em', stroke: 32, gap: '0.02em' },
  xl: { height: '0.72em', stroke: 30, gap: '0.02em' },
}

const textSizes = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-5xl',
  xl: 'text-6xl',
}

export default function Logo({ size = 'sm', className = '' }: LogoProps) {
  const { height, stroke, gap } = sizes[size]

  return (
    <span className={`inline-flex items-end font-light tracking-tight ${textSizes[size]} ${className}`}>
      <svg
        viewBox="0 0 100 87"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          height,
          width: 'auto',
          marginRight: gap,
        }}
      >
        <polygon
          points="50,4 96,83 4,83"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke / 5}
          strokeLinejoin="miter"
        />
      </svg>
      <span>IDAMO</span>
    </span>
  )
}
