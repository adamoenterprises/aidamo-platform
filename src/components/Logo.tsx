interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const textSizes = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-5xl',
  xl: 'text-6xl',
}

export default function Logo({ size = 'sm', className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-baseline font-light tracking-tight ${textSizes[size]} ${className}`}>
      <svg
        viewBox="0 0 60 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          height: '0.68em',
          width: 'auto',
          position: 'relative',
          top: '0.02em',
        }}
      >
        <polygon
          points="30,2 58,68 2,68"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="miter"
        />
      </svg>
      <span>IDAMO</span>
    </span>
  )
}
