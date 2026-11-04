import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Flame, Globe2, Sparkles, Heart } from 'lucide-react'
import Diya from './components/Diya'
import Installation from './components/Installation'
import WorldMap from './components/WorldMap'
import LightModal from './components/LightModal'
import { useDiyas } from './hooks/useDiyas'
import { hash, countryName, flag } from './lib/util'
import { Analytics } from "@vercel/analytics/react"

// Inside your App component:/>

const NAV = [['Installation', '#installation'], ['Map', '#map'], ['Participation', '#world-lights'], ['About', '#about'], ['Diwali', '#meaning'], ['Around the world', '#around'], ['Suriname', '#suriname']]
const AROUND: [string, string, string][] = [
  ['India', 'Where it began', 'Homes are cleaned, doorsteps painted with rangoli, and rows of clay lamps line every window and wall.'],
  ['Nepal', 'Tihar', 'Five days of lights that honour crows, dogs, cows and the bond between siblings.'],
  ['Trinidad & Tobago', 'Divali Nagar', 'Thousands of deyas glow in villages and cities, alongside sweet shops and concerts.'],
  ['Fiji & Mauritius', 'Islands of light', 'Families who crossed the seas carried the festival with them and made it a shared national joy.'],
  ['Singapore & the UK', 'Streets in lights', 'Little India and Leicester light up with markets, music and street illuminations.']]

function Twinkles() {
  const dots = useMemo(() => Array.from({ length: 140 }, (_, i) => ({ x: hash(String(i), 1) * 100, y: hash(String(i), 2) * 100, s: 2 + hash(String(i), 3) * 4, d: 2 + hash(String(i), 4) * 4, c: ['#FFD34E', '#FF642D', '#FF4F91', '#12B8A6', '#FFF4E5'][i % 5] })), [])
  return <div aria-hidden className="absolute inset-0 overflow-hidden">{dots.map((d, i) => <span key={i} className="twinkle absolute rounded-full" style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, background: d.c, ['--d' as string]: `${d.d}s`, animationDelay: `${-d.d * hash(String(i), 9)}s` }} />)}</div>
}

export default function App() {
  const { diyas, total, countries, status, live, light, demo } = useDiyas()
  const [open, setOpen] = useState(false)
  const wishes = diyas.filter(d => d.message).slice(0, 6)
  const cta = (cls = '') => <button onClick={() => setOpen(true)} className={`inline-flex items-center gap-2 rounded-full bg-saffron px-7 py-4 text-lg font-bold text-plum shadow-[0_0_40px_#FF642D88] transition hover:scale-105 hover:bg-gold ${cls}`}><Flame size={20} />Light a Diya</button>
  return (
    <>
      {demo && <div role="status" className="relative z-50 bg-gold px-4 py-2 text-center text-sm font-bold text-plum">DEMO MODE: sample diyas only. Diyas you light here are not shared with anyone. Add Supabase credentials to go live.</div>}
      <header className="sticky top-0 z-[250] flex items-center justify-between bg-plum/85 px-5 py-3 backdrop-blur">
        <a href="#top" className="font-display text-2xl font-black tracking-wide text-gold">DEEPOTSAV</a>
        <nav aria-label="Main" className="hidden gap-6 text-sm font-medium lg:flex">{NAV.map(([n, h]) => <a key={h} href={h} className="hover:text-gold">{n}</a>)}</nav>
        <button onClick={() => setOpen(true)} className="rounded-full bg-saffron px-4 py-2 text-sm font-bold text-plum">Light a Diya</button>
      </header>
      <main id="top">
        <section className="relative grid min-h-[92svh] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_70%,#54236D,#24102F_65%)] px-5 py-16 text-center">
          <Twinkles />
          <div className="relative z-10 max-w-4xl">
            <div className="mx-auto w-fit"><Diya size={220} dur={2.8} /></div>
            <h1 className="mt-2 font-display text-5xl font-black leading-[.95] sm:text-8xl"><span className="bg-gradient-to-r from-gold via-saffron to-pink bg-clip-text text-transparent">LIGHT UP THE WORLD.</span></h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-cream/90 sm:text-2xl">One diya. One wish. One world connected by light.</p>
            <div className="mt-8 flex flex-col items-center gap-4">{cta()}
              <p aria-live="polite" className="rounded-full border border-gold/50 px-5 py-2 font-bold text-gold">{status === 'ready' ? `${total.toLocaleString()} ${demo ? 'sample ' : ''}${total === 1 ? 'diya' : 'diyas'} lit` : 'Counting lights…'}</p></div>
          </div>
        </section>

        <Installation diyas={diyas} status={status} onLight={() => setOpen(true)} />
        <WorldMap diyas={diyas} />

        <section id="world-lights" className="bg-turq px-5 py-20 text-plum">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center gap-3"><h2 className="font-display text-4xl font-black sm:text-6xl">Lit by the world</h2>
              <span className="flex items-center gap-2 rounded-full bg-plum px-4 py-1.5 text-sm font-bold text-cream"><span className={`h-3 w-3 rounded-full ${live ? 'live-dot bg-turq' : 'bg-gold'}`} />{demo ? 'Demo: not live' : live ? 'Live: listening for new diyas' : 'Connecting…'}</span></div>
            <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.4fr]">
              <div className="space-y-4">
                <div className="rounded-[2rem] bg-plum p-6 text-cream"><p className="font-display text-6xl font-black text-gold">{status === 'ready' ? total.toLocaleString() : '–'}</p><p>{demo ? 'sample diyas (demo)' : 'diyas lit'}</p></div>
                <div className="rounded-[2rem] rounded-tr-md bg-pink p-6"><p className="font-display text-6xl font-black">{status === 'ready' ? countries.length : '–'}</p><p>{status === 'ready' && countries.length === 0 ? 'No countries shared yet' : 'participating countries'}</p>
                  <p className="mt-2 text-xl" aria-label="Country flags">{countries.slice(0, 24).map(c => <span key={c} title={countryName(c)}>{flag(c)} </span>)}</p></div></div>
              <div className="rounded-[2rem] bg-cream p-6"><h3 className="font-display text-2xl font-black">Recent wishes</h3>
                {wishes.length === 0 ? <p className="mt-3">No wishes yet. Light a diya and share the first one.</p> :
                  <ul className="mt-3 space-y-3">{wishes.map(w => <li key={w.id} className="border-l-4 border-saffron pl-3"><p className="font-medium">“{w.message}”</p><p className="text-sm text-royal">{w.country_code ? `${flag(w.country_code)} ${countryName(w.country_code)}` : 'Somewhere on Earth'}</p></li>)}</ul>}</div>
            </div></div>
        </section>

        <section id="about" className="bg-royal px-5 py-20"><div className="mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-black text-gold sm:text-6xl">About DEEPOTSAV</h2>
          <p className="mt-5 text-xl leading-relaxed">Deepotsav means “festival of lights”. This is a shared installation where anyone, anywhere, can light a diya and optionally leave a wish. Each diya you see was lit by a real visitor, and new ones appear the moment they are lit.</p>
          <p className="mt-4 text-lg text-cream/80">We store only your optional message, optional country, and a random anonymous session id. No names, no accounts.</p></div></section>

        <section id="meaning" className="bg-cream px-5 py-20 text-plum"><div className="mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-black text-saffron sm:text-6xl">What Diwali means</h2>
          <p className="mt-5 text-xl leading-relaxed">Diwali celebrates the victory of light over darkness, knowledge over ignorance, and good over evil. Different traditions tell it through different stories: Rama’s return to Ayodhya, the goddess Lakshmi, the triumph over Narakasura. All of them gather around the same small flame.</p>
          <p className="mt-4 text-xl leading-relaxed">Families clean their homes, share sweets, forgive old quarrels and light diyas, tiny oil lamps that say: you are welcome here.</p></div></section>

        <section id="around" className="bg-plum px-5 py-20"><div className="mx-auto max-w-5xl">
          <h2 className="flex items-center gap-3 font-display text-4xl font-black text-gold sm:text-6xl"><Globe2 className="shrink-0" size={44} />Diwali around the world</h2>
          <div className="mt-10 space-y-5">{AROUND.map(([place, tag, text], i) => (
            <div key={place} className={`max-w-xl rounded-[2rem] p-6 text-plum ${i % 2 ? 'ml-auto rounded-tr-md bg-gold' : 'rounded-tl-md bg-pink'}`}>
              <h3 className="font-display text-2xl font-black">{place}: {tag}</h3><p className="mt-1">{text}</p></div>))}</div></div></section>

        <section id="suriname" className="bg-gradient-to-br from-saffron to-pink px-5 py-20 text-plum"><div className="mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-black sm:text-6xl">Divali in Suriname</h2>
          <p className="mt-5 text-xl leading-relaxed">Hindustani Surinamers trace their roots to the contract labourers who arrived from India starting in 1873. They kept the lamps burning across generations. Today, Divali in Paramaribo and across the districts means deyas along the windowsills, family tables full of sweets, and neighbours of every background stopping to admire the glow.</p>
          <p className="mt-4 flex items-center gap-2 text-xl font-bold"><Heart size={22} />Suriname is one of the many places this installation is built for. Add your deya to the sky.</p>
          <div className="mt-6">{cta('!bg-plum !text-gold !shadow-none')}</div></div></section>

        <section className="relative overflow-hidden px-5 py-28 text-center"><Twinkles />
          <div className="relative z-10"><Sparkles className="mx-auto text-gold" size={36} /><h2 className="mt-3 font-display text-4xl font-black sm:text-7xl">One world.<br />A thousand lights.<br />One shared celebration.</h2>
            <div className="mt-8">{cta()}</div></div></section>
      </main>
      <footer className="bg-plum px-5 py-8 text-center text-sm text-cream/70">DEEPOTSAV · Shubh Diwali, Happy Divali, to everyone, everywhere.</footer>
      <AnimatePresence>{open && <LightModal demo={demo} onClose={() => setOpen(false)} onLight={light} />}</AnimatePresence>
    </>)





}

