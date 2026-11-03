import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import Diya from './Diya'
import { COUNTRIES, countryName, flag } from '../lib/util'

type Phase = 'form' | 'saving' | 'done'
export default function LightModal({ onClose, onLight, demo }: { onClose: () => void; onLight: (m: string, c: string) => Promise<string | null>; demo: boolean }) {
  const [msg, setMsg] = useState(''); const [country, setCountry] = useState(''); const [phase, setPhase] = useState<Phase>('form'); const [err, setErr] = useState<string | null>(null)
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [onClose])
  const submit = async () => { setPhase('saving'); setErr(null); const e = await onLight(msg, country); if (e) { setErr(e); setPhase('form') } else setPhase('done') }
  return (
    <div className="fixed inset-0 z-[300] grid place-items-center bg-plum/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-labelledby="mt" initial={{ scale: .9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} onClick={e => e.stopPropagation()}
        className="relative max-h-[92svh] w-full max-w-md overflow-y-auto rounded-[2.5rem] rounded-br-lg bg-cream p-7 text-plum">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1 hover:bg-plum/10"><X size={22} /></button>
        <div className="grid place-items-center pt-2"><motion.div animate={phase === 'done' ? { scale: [1, 1.4, 1.2] } : {}}><Diya size={120} lit={phase === 'done' || phase === 'saving'} /></motion.div></div>
        {phase === 'done' ? (
          <div className="mt-4 text-center" role="status"><h2 id="mt" className="font-display text-3xl font-black">Your diya is lit.</h2>
            <p className="mt-2">{demo ? 'Demo mode: your diya is only visible on this device.' : 'It now glows in the shared sky for everyone to see.'}</p>
            <button onClick={() => { onClose(); document.getElementById('installation')?.scrollIntoView() }} className="mt-5 rounded-full bg-saffron px-6 py-3 font-bold text-plum">See it glow</button></div>
        ) : (
          <form className="mt-4" onSubmit={e => { e.preventDefault(); submit() }}>
            <h2 id="mt" className="text-center font-display text-2xl font-black">What light do you want to bring into the world?</h2>
            <label className="mt-4 block text-sm font-medium" htmlFor="msg">Your wish (optional)</label>
            <textarea id="msg" value={msg} onChange={e => setMsg(e.target.value)} maxLength={280} rows={3} placeholder="Peace, health, a friend’s return home…" className="mt-1 w-full rounded-2xl border-2 border-royal/30 bg-white p-3 focus:border-saffron" />
            <p className="text-right text-xs text-royal">{msg.length}/280</p>
            <label className="block text-sm font-medium" htmlFor="cc">Country (optional)</label>
            <select id="cc" value={country} onChange={e => setCountry(e.target.value)} className="mt-1 w-full rounded-2xl border-2 border-royal/30 bg-white p-3">
              <option value="">Prefer not to say</option>{COUNTRIES.map(c => <option key={c} value={c}>{flag(c)} {countryName(c)}</option>)}</select>
            {err && <p role="alert" className="mt-3 rounded-xl bg-pink/15 p-3 text-sm font-medium">{err}</p>}
            <button disabled={phase === 'saving'} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-saffron py-3.5 text-lg font-bold text-plum hover:bg-gold disabled:opacity-60">
              {phase === 'saving' ? <><Loader2 className="animate-spin" size={20} />Lighting…</> : 'Light My Diya'}</button>
            {demo && <p className="mt-2 text-center text-xs text-royal">Demo mode: not shared globally.</p>}
          </form>)}
      </motion.div>
    </div>)
}
