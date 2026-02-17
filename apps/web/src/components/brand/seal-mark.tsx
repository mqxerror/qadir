interface SealMarkProps {
  variant?: 'primary' | 'minimal';
  size?: number;
}

export function SealMark({ variant = 'primary', size = 80 }: SealMarkProps) {
  return (
    <div
      role="img"
      aria-label="QADIR Montreal"
      className="inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="250" cy="250" r="230" stroke="currentColor" strokeWidth="4" />
        {variant === 'primary' && (
          <>
            <text x="250" y="270" style={{ fontFamily: "'Georgia','Times New Roman','Serif'", fontSize: '90px', letterSpacing: '5px', fill: 'currentColor', textAnchor: 'middle' }}>
              Q&#193;DIR
            </text>
            <text x="250" y="90" style={{ fontFamily: "'Arial','Helvetica','Sans-Serif'", fontSize: '22px', letterSpacing: '3px', fill: 'var(--color-accent)', textAnchor: 'middle' }}>
              AUTORIT&#201; EN ESSENCE
            </text>
          </>
        )}
        {variant === 'minimal' && (
          <text x="250" y="290" style={{ fontFamily: "'Georgia','Times New Roman','Serif'", fontSize: '110px', letterSpacing: '5px', fill: 'currentColor', textAnchor: 'middle' }}>
            Q
          </text>
        )}
      </svg>
    </div>
  );
}
