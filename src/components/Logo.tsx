interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm: { svg: 12, text: 'text-sm', stroke: 40 },
  md: { svg: 18, text: 'text-xl', stroke: 36 },
  lg: { svg: 44, text: 'text-5xl', stroke: 32 },
  xl: { svg: 52, text: 'text-6xl', stroke: 30 },
}

export default function Logo({ size = 'sm', className = '' }: LogoProps) {
  const { svg, text, stroke } = sizes[size]

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
        }}
      >
        <polygon
          points="256,40 480,472 32,472"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinejoin="miter"
        />
      </svg>
      <span className={text}>IDAMO</span>
    </span>
  )
}
