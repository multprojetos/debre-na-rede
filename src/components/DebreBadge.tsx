/** Renders the Debreceni FC badge as SVG or uses the team image if available */
interface Props { size?: number; className?: string }

export default function DebreBadge({ size = 80, className = '' }: Props) {
    return (
        <div
            className={`debre-badge-wrap ${className}`}
            style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            {/* Try to use actual badge image, fallback to SVG shield */}
            <img
                src="/badge.png"
                alt="Debreceni FC"
                style={{ width: size, height: size, objectFit: 'contain', borderRadius: '50%' }}
                onError={(e) => {
                    // Fallback: hide img and show SVG
                    ; (e.target as HTMLImageElement).style.display = 'none'
                    const parent = (e.target as HTMLImageElement).parentElement!
                    parent.innerHTML = svgBadge(size)
                }}
            />
        </div>
    )
}

function svgBadge(size: number) {
    return `
  <svg width="${size}" height="${size}" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="80" r="78" fill="#1B2A4A" stroke="#C9A227" stroke-width="3"/>
    <circle cx="80" cy="80" r="68" fill="none" stroke="#C9A22740" stroke-width="1"/>
    <!-- Shield shape -->
    <path d="M80 25 L115 45 L115 85 Q115 115 80 135 Q45 115 45 85 L45 45 Z" fill="#152550" stroke="#C9A227" stroke-width="2"/>
    <!-- Eagle silhouette simplified -->
    <text x="80" y="90" font-family="serif" font-size="48" fill="#C9A227" text-anchor="middle" dominant-baseline="middle">⚜</text>
    <!-- Club name -->
    <text x="80" y="148" font-family="sans-serif" font-size="8" fill="#C9A227" text-anchor="middle" letter-spacing="3" font-weight="bold">DEBRECENI FC</text>
    <!-- Year -->
    <text x="80" y="35" font-family="sans-serif" font-size="9" fill="#C9A22780" text-anchor="middle">2009</text>
  </svg>`
}
