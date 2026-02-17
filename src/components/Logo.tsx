interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm: { svg: 14, text: 'text-sm' },
  md: { svg: 20, text: 'text-xl' },
  lg: { svg: 48, text: 'text-5xl' },
  xl: { svg: 56, text: 'text-6xl' },
}

export default function Logo({ size = 'sm', className = '' }: LogoProps) {
  const { svg, text } = sizes[size]

  return (
    <span className={`inline-flex items-baseline font-light tracking-tight ${className}`}>
      <svg
        width={svg}
        height={svg}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
        style={{
          verticalAlign: 'baseline',
          marginBottom: size === 'sm' ? '-1px' : size === 'md' ? '-2px' : '-4px',
          marginRight: size === 'sm' ? '1px' : '2px'
        }}
      >
        <rect width="512" height="512" rx="0" fill="currentColor" />
        <polygon
          points="256,80 420,420 92,420"
          fill="none"
          stroke="white"
          strokeWidth="24"
          strokeLinejoin="miter"
        />
      </svg>
      <span className={text}>IDAMO</span>
    </span>
  )
}
