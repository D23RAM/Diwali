const PAL = [['#FF642D','#FFD34E'],['#FF4F91','#FFD34E'],['#12B8A6','#FFF4E5'],['#FFD34E','#FF642D'],['#8E4AB5','#FFD34E'],['#FF642D','#FF4F91']]
export default function Diya({ size = 64, style = 0, dur = 2.4, delay = 0, lit = true }: { size?: number; style?: number; dur?: number; delay?: number; lit?: boolean }) {
  const [bowl, trim] = PAL[style % 6]
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 100 90" aria-hidden="true" style={{ overflow: 'visible' }}>
      <defs><radialGradient id="glow"><stop offset="0" stopColor="#FFD34E" stopOpacity=".55"/><stop offset="1" stopColor="#FF642D" stopOpacity="0"/></radialGradient>
        <linearGradient id="fl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#FF642D"/><stop offset=".6" stopColor="#FFD34E"/><stop offset="1" stopColor="#FFF4E5"/></linearGradient></defs>
      {lit && <circle cx="50" cy="32" r="52" fill="url(#glow)"/>}
      <path d="M6 46 Q50 98 94 46 Z" fill={bowl}/><path d="M6 46 Q50 66 94 46" fill="none" stroke={trim} strokeWidth="4" strokeLinecap="round"/>
      <path d="M30 60 Q50 74 70 60" fill="none" stroke={trim} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round"/>
      <ellipse cx="50" cy="46" rx="44" ry="9" fill="#24102F" opacity=".35"/>
      {lit && <g className="flame" style={{ ['--d' as string]: `${dur}s`, animationDelay: `${delay}s` }}>
        <path d="M50 4 C64 22 66 36 50 46 C34 36 36 22 50 4Z" fill="url(#fl)"/><path d="M50 24 C56 32 57 38 50 44 C43 38 44 32 50 24Z" fill="#FFF4E5" opacity=".9"/></g>}
    </svg>
  )
}
