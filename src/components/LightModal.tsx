import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import Diya from './Diya'
import { COUNTRIES, countryName, flag } from '../lib/util'

type Phase = 'form' | 'saving' | 'done'
export default function LightModal({ onClose, onLight, demo }: { onClose: () => void; onLight: (m: string, c: string, n: string, anon: boolean) => Promise<string | null>; demo: boolean }) {
  const [msg, setMsg] = useState(''); const [country, setCountry] = useState(''); const [name, setName] = useState(''); const [anon, setAnon] = useState(false); const [phase, setPhase] = useState<Phase>('form'); const [err, setErr] = useState<string | null>(null)
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [onClose])
  const submit = async () => { setPhase('saving'); setErr(null); const e = await onLight(msg, country, name, anon); if (e) { setErr(e); setPhase('form') } else setPhase('done') }
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
            <fieldset className="mt-4"><legend className="text-sm font-medium">Should your wish be shown?</legend>
              <div className="mt-1 grid grid-cols-2 gap-2">{[{ v: false, t: 'Show my wish', s: 'Wish, name and country are shown' }, { v: true, t: "Don't show my wish", s: 'Your diya glows without a wish' }].map(o => (
                <label key={String(o.v)} className={`cursor-pointer rounded-2xl border-2 p-3 text-sm focus-within:outline focus-within:outline-2 focus-within:outline-royal ${anon === o.v ? 'border-saffron bg-saffron/15' : 'border-royal/30'}`}>
                  <input type="radio" name="vis" className="sr-only" checked={anon === o.v} onChange={() => setAnon(o.v)} /><b className="block">{o.t}</b>{o.s}</label>))}</div></fieldset>
            {!anon ? <><label className="mt-4 block text-sm font-medium" htmlFor="msg">Your wish (optional)</label>
            <textarea id="msg" value={msg} onChange={e => setMsg(e.target.value)} maxLength={280} rows={3} placeholder="Peace, health, a friend’s return home…" className="mt-1 w-full rounded-2xl border-2 border-royal/30 bg-white p-3 focus:border-saffron" />
            <p className="text-right text-xs text-royal">{msg.length}/280</p></> : <p className="mt-3 rounded-2xl bg-royal/10 p-3 text-sm">Your diya will glow without a wish. Nothing you write is saved or shown. You can still pick a country to place it on the map.</p>}
            
            {!anon && <><label className="mt-3 block text-sm font-medium" htmlFor="nm">First name (optional)</label>
              <input id="nm" value={name} onChange={e => setName(e.target.value)} maxLength={40} className="mt-1 w-full rounded-2xl border-2 border-royal/30 bg-white p-3 focus:border-saffron" /></>}
            <label className="mt-3 block text-sm font-medium" htmlFor="cc">Country (optional)</label>
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
