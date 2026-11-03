import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Diya from './Diya'
import { LAND } from '../lib/worldPath'
import { Diya as D, COORDS, hash, countryName, byline } from '../lib/util'

export default function WorldMap({ diyas }: { diyas: D[] }) {
  const [sel, setSel] = useState<D | null>(null)
  const placed = useMemo(() => diyas.filter(d => d.country_code && COORDS[d.country_code]).map(d => {
    const [lat, lng] = COORDS[d.country_code!]
    return { d, x: (lng + 180) / 360 * 100 + (hash(d.id, 6) - .5) * 2.4, y: (90 - lat) / 180 * 100 + (hash(d.id, 7) - .5) * 4 }
  }), [diyas])
  return (
    <section id="map" aria-label="World map of diyas" className="bg-plum px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-4xl font-black text-gold sm:text-6xl">Lights across the map</h2>
        <p className="mt-2 text-center text-cream/80">{placed.length} on the map · {diyas.length - placed.length} lit without a country</p>
        <div className="mt-8 overflow-x-auto rounded-[2rem] bg-royal/40 p-3">
          <div className="relative min-w-[680px]" style={{ aspectRatio: '2 / 1' }}>
            <svg viewBox="0 0 1000 500" className="absolute inset-0 h-full w-full" role="img" aria-label="World map"><path d={LAND} fill="#54236D" stroke="#FF4F91" strokeOpacity=".5" strokeWidth=".6" /></svg>
            {placed.length === 0 && <p className="absolute inset-0 grid place-items-center text-cream/80">Pick a country when you light a diya to place it here.</p>}
            {placed.map(({ d, x, y }) => (
              <motion.button key={d.id} initial={{ scale: 0, y: -20 }} animate={{ scale: 1, y: 0 }} onClick={() => setSel(d)}
                aria-label={`Diya in ${countryName(d.country_code!)}${d.message ? `: ${d.message}` : ''}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 hover:z-10 hover:scale-150 focus-visible:z-10" style={{ left: `${x}%`, top: `${y}%`, width: 24 }}>
                <Diya size={24} style={d.visual_style} dur={1.8 + hash(d.id, 4) * 1.8} delay={-hash(d.id, 5) * 3} />
              </motion.button>))}
          </div>
        </div>
        <div aria-live="polite" className="mx-auto mt-5 max-w-md rounded-[2rem] rounded-tl-md bg-cream p-5 text-plum">
          {sel ? <><p className="font-display text-xl font-black">{sel.message ?? 'A quiet light, lit without words.'}</p><p className="mt-2 text-sm text-royal">{byline(sel)}</p></> : <p>Tap a diya on the map to read its wish.</p>}
        </div>
      </div>
    </section>)
}
