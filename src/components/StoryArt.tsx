import type { ReactNode } from 'react'

type Kind = 'rama' | 'lakshmi' | 'krishna' | 'kali'
type FigProps = { x: number; y: number; s?: number; skin: string; robe: string; crown?: 'mukut' | 'feather' | 'jata' | 'hair'; halo?: string; children?: ReactNode }

/** Stylised devotional figure: prabhāvali (halo), crown, face, arms and robe. */
function Fig({ x, y, s = 1, skin, robe, crown = 'mukut', halo = '#FFD34E', children }: FigProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cy={-62} r={34} fill={halo} opacity={0.3} />
      <path d="M-24-30L24-30L38 78L-38 78Z" fill={robe} /><path d="M-38 70L38 70" stroke="#FFD34E" strokeWidth={5} />
      <rect x={-6} y={-44} width={12} height={16} fill={skin} />
      <path d="M-24-26Q-42 8-18 34M24-26Q42 8 18 34" stroke={skin} strokeWidth={9} fill="none" strokeLinecap="round" />
      {crown === 'hair' && <path d="M-20-70Q-36 10-14-20L0-60L14-20Q36 10 20-70Z" fill="#12061B" />}
      <circle cy={-62} r={17} fill={skin} />
      <path d="M-9-64q3.5-3 7 0M2-64q3.5-3 7 0M-4-54q4 3 8 0" stroke="#24102F" strokeWidth={1.5} fill="none" />
      {crown === 'mukut' && <path d="M-15-74L-11-98L-4-84L0-104L4-84L11-98L15-74Z" fill="#FFD34E" stroke="#C98A12" />}
      {crown === 'feather' && <><path d="M-15-74Q0-90 15-74Z" fill="#FFD34E" /><path d="M4-82Q18-104 10-116Q0-100 4-82Z" fill="#12B8A6" /><circle cx={9} cy={-102} r={3} fill="#FFD34E" /></>}
      {crown === 'jata' && <circle cy={-84} r={11} fill="#24102F" />}
      {crown === 'hair' && <path d="M-17-70Q0-92 17-70Q0-76-17-70Z" fill="#12061B" />}
      {children}
    </g>
  )
}
const Lotus = ({ x, y, s = 1, c = '#FF4F91' }: { x: number; y: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>{[-60, -30, 0, 30, 60].map(a => <ellipse key={a} cy={-14} rx={8} ry={16} fill={c} stroke="#FFF4E5" strokeWidth={1} transform={`rotate(${a})`} />)}<circle r={5} fill="#FFD34E" /></g>
)
const Stars = ({ n = 30 }: { n?: number }) => <>{Array.from({ length: n }, (_, i) => <circle key={i} cx={(i * 97) % 280 + 10} cy={(i * 53) % 190 + 30} r={(i % 3) + 0.8} fill="#FFF4E5" opacity={0.7} />)}</>
const Diyas = () => <>{Array.from({ length: 11 }, (_, i) => <g key={i} transform={`translate(${28 + i * 24} 352)`}><path d="M-9 0Q0 10 9 0Z" fill="#FF642D" /><path d="M0-12Q5-5 0-1Q-5-5 0-12Z" fill="#FFD34E" /></g>)}</>
const El = ({ x, f }: { x: number; f: number }) => (
  <g transform={`translate(${x} 205) scale(${f} 1)`}><ellipse rx={34} ry={24} fill="#C9B6D9" /><circle cx={30} cy={-20} r={17} fill="#C9B6D9" /><circle cx={22} cy={-26} r={9} fill="#A98FC0" />
    <path d="M42-14Q62-22 58-52" stroke="#C9B6D9" strokeWidth={9} fill="none" strokeLinecap="round" /><path d="M50-56Q58-70 70-60L66-44Q56-40 50-56Z" fill="#FFD34E" />
    <rect x={-24} y={20} width={8} height={30} fill="#C9B6D9" /><rect x={14} y={20} width={8} height={30} fill="#C9B6D9" /></g>
)

const SCENES: Record<Kind, ReactNode> = {
  rama: <>
    <Stars n={22} />
    <path d="M40 260V190L60 150L80 190V260ZM210 260V170L235 120L260 170V260ZM120 260V200Q150 150 180 200V260Z" fill="#24102F" opacity={0.5} />
    <Fig x={78} y={232} s={0.95} skin="#E8B58A" robe="#FF4F91" />
    <Fig x={150} y={218} s={1.2} skin="#4A86D8" robe="#FFD34E" />
    <path d="M192 120Q240 200 192 290" stroke="#FFD34E" strokeWidth={4} fill="none" /><line x1={192} y1={120} x2={192} y2={290} stroke="#FFF4E5" />
    <Fig x={242} y={240} s={0.85} skin="#E0A878" robe="#12B8A6" />
    <Fig x={62} y={338} s={0.5} skin="#FF7A3D" robe="#FF642D" crown="jata"><rect x={24} y={-30} width={8} height={70} rx={3} fill="#FFD34E" /><circle cx={28} cy={-34} r={13} fill="#FFD34E" /></Fig>
    <Diyas />
  </>,
  lakshmi: <>
    <circle cx={150} cy={170} r={120} fill="#FFD34E" opacity={0.15} /><circle cx={150} cy={170} r={72} fill="#FFD34E" opacity={0.2} />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={(i * 61) % 240 + 30} cy={(i * 37) % 150 + 90} r={5} fill="#FFD34E" stroke="#C98A12" />)}
    <El x={52} f={1} /><El x={248} f={-1} />
    <Lotus x={150} y={345} s={3.4} />
    <Fig x={150} y={215} s={1.25} skin="#E8B58A" robe="#FF4F91" />
    <Lotus x={112} y={236} s={0.7} /><Lotus x={188} y={236} s={0.7} />
  </>,
  krishna: <>
    <Stars n={16} />
    <path d="M0 270V200H30V170H50V200H80V180H100V270ZM205 270V190H228V150H248V190H300V270Z" fill="#24102F" opacity={0.7} />
    <g transform="translate(240 100)"><circle r={20} fill="none" stroke="#FFD34E" strokeWidth={4} />{Array.from({ length: 12 }, (_, i) => <line key={i} y1={-20} y2={-31} stroke="#FFD34E" strokeWidth={3} transform={`rotate(${i * 30})`} />)}</g>
    <path d="M30 150Q8 230 30 310" stroke="#FFD34E" strokeWidth={4} fill="none" /><line x1={30} y1={150} x2={30} y2={310} stroke="#FFF4E5" />
    <Fig x={86} y={238} skin="#E8B58A" robe="#12B8A6" />
    <Fig x={178} y={226} s={1.2} skin="#4A86D8" robe="#FFD34E" crown="feather" />
    <line x1={150} y1={232} x2={215} y2={214} stroke="#F5E1B0" strokeWidth={4} strokeLinecap="round" />
  </>,
  kali: <>
    <Stars /><circle cx={238} cy={78} r={22} fill="#0A0310" stroke="#FFF4E5" strokeOpacity={0.5} />
    <g transform="translate(150 335)"><rect x={-100} y={-14} width={200} height={34} rx={17} fill="#CFE3F5" /><circle cx={-86} cy={-2} r={16} fill="#CFE3F5" /></g>
    <Fig x={150} y={238} s={1.3} skin="#2E3FA0" robe="#C1121F" crown="hair" halo="#FF4F91">
      {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={-18 + i * 6} cy={-26 + (3 - Math.abs(i - 3)) * 3} r={3.2} fill="#FFF4E5" />)}
      <path d="M-3-52Q0-40 3-52Z" fill="#E63946" /><circle cy={-72} r={2} fill="#E63946" />
      <line x1={-46} y1={-4} x2={-62} y2={-84} stroke="#FFD34E" strokeWidth={5} strokeLinecap="round" /><circle cx={-46} cy={-4} r={6} fill="#2E3FA0" />
      <circle cx={52} cy={-34} r={8} fill="#2E3FA0" stroke="#FFD34E" />
    </Fig>
    <Lotus x={36} y={360} s={0.6} c="#E63946" /><Lotus x={264} y={360} s={0.6} c="#E63946" />
  </>,
}
const BG: Record<Kind, [string, string]> = { rama: ['#54236D', '#FF642D'], lakshmi: ['#54236D', '#FF4F91'], krishna: ['#0E6E66', '#24102F'], kali: ['#12061B', '#54236D'] }
const ARCH = 'M8 372V150Q8 14 150 14Q292 14 292 150V372Z'

export default function Art({ kind, label }: { kind: Kind; label: string }) {
  return (
    <svg viewBox="0 0 300 380" role="img" aria-label={label} className="mx-auto w-full max-w-sm drop-shadow-[0_0_40px_rgba(255,211,78,.25)]">
      <defs><linearGradient id={`bg-${kind}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={BG[kind][0]} /><stop offset="1" stopColor={BG[kind][1]} /></linearGradient><clipPath id={`arch-${kind}`}><path d={ARCH} /></clipPath></defs>
      <path d={ARCH} fill={`url(#bg-${kind})`} stroke="#FFD34E" strokeWidth={4} />
      <g clipPath={`url(#arch-${kind})`}>{SCENES[kind]}</g>
      <path d="M20 366V152Q20 28 150 28Q280 28 280 152V366Z" fill="none" stroke="#FFD34E" strokeOpacity={0.6} strokeWidth={2} strokeDasharray="2 6" strokeLinecap="round" />
    </svg>
  )
}
