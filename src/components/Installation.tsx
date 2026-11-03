import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Flame } from 'lucide-react'
import Diya from './Diya'
import { Diya as D, layout, byline } from '../lib/util'

export default function Installation({ diyas, status, onLight }: { diyas: D[]; status: string; onLight: () => void }) {
  const [sel, setSel] = useState<D | null>(null)
  return (
    <section id="installation" aria-label="Global diya installation" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[radial-gradient(ellipse_at_50%_100%,#54236D_0%,#24102F_70%)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-plum to-transparent px-6 pb-16 pt-10 text-center">
        <h2 className="font-display text-4xl font-black text-gold sm:text-6xl">The Sea of Lights</h2>
        <p className="mx-auto mt-2 max-w-md text-cream/80">Every glow is a real person. Tap a diya to read its wish.</p>
      </div>
      {status === 'loading' && <p role="status" className="absolute inset-0 grid place-items-center text-xl text-gold">Gathering the lights…</p>}
      {status === 'error' && <p role="alert" className="absolute inset-0 grid place-items-center px-6 text-center text-xl text-pink">The lights could not be loaded. Check your Supabase settings and refresh.</p>}
      {status === 'ready' && diyas.length === 0 && (
        <div className="absolute inset-0 grid place-items-center text-center"><div><p className="font-display text-3xl">The sky is dark. Be the first light.</p>
          <button onClick={onLight} className="mt-5 rounded-full bg-saffron px-7 py-3 font-bold text-plum">Light a Diya</button></div></div>)}
      {diyas.map(d => { const l = layout(d.id); return (
        <button key={d.id} onClick={() => setSel(d)} aria-label={d.message ? `Diya with a wish: ${d.message}` : 'Diya without a message'}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 focus-visible:scale-125"
          style={{ left: `${l.x}%`, top: `${l.y}%`, zIndex: Math.round(l.y) }}>
          <Diya size={l.size} style={d.visual_style} dur={l.dur} delay={l.delay} />
          {d.message && <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gold" />}
        </button>) })}
      <AnimatePresence>{sel && (
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} role="dialog" aria-label="Diya wish"
          className="absolute inset-x-4 bottom-6 z-[200] mx-auto max-w-md rounded-[2rem] rounded-tl-md bg-cream p-6 text-plum shadow-2xl">
          <button onClick={() => setSel(null)} aria-label="Close wish" className="absolute right-3 top-3 rounded-full p-1 hover:bg-plum/10"><X size={20} /></button>
          <p className="font-display text-xl font-black">{sel.message ?? 'A quiet light, lit without words.'}</p>
          <p className="mt-3 text-sm text-royal">{byline(sel)} · {new Date(sel.created_at).toLocaleString()}</p>
        </motion.div>)}</AnimatePresence>
      <button onClick={onLight} className="absolute right-6 top-28 z-[150] flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-bold text-plum shadow-lg hover:bg-saffron"><Flame size={18} />Add yours</button>
    </section>
  )
}
