import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase, isDemo } from '../lib/supabase'
import { Diya, cleanMessage, cleanName, sessionId, hash } from '../lib/util'

const SAMPLE = ['May every home glow with peace.','Health for my family.','Light after darkness.','For my grandmother, who taught me the song.','Kindness for everyone.','New beginnings.','Safe travels home.','Joy, sweets and laughter!']
const demoDiyas = (): Diya[] => Array.from({ length: 80 }, (_, i) => ({ id: `demo-${i}`, created_at: new Date(Date.now() - i * 6e5).toISOString(),
  message: i % 3 === 0 ? SAMPLE[i % SAMPLE.length] : null, country_code: ['SR','IN','NL','TT','GY','FJ','MU'][i % 7], anonymous_session_id: 'demo-session', display_name: i % 4 === 0 ? ['Asha', 'Ravi', 'Mira'][i % 3] : null, visual_style: Math.floor(hash(String(i)) * 6) }))

export function useDiyas() {
  const [diyas, setDiyas] = useState<Diya[]>([])
  const [total, setTotal] = useState(0)
  const [countries, setCountries] = useState<string[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [live, setLive] = useState(false)
  const seen = useRef(new Set<string>())

  const add = useCallback((d: Diya) => {
    if (seen.current.has(d.id)) return
    seen.current.add(d.id)
    setDiyas(p => [d, ...p].slice(0, 600)); setTotal(t => t + 1)
    if (d.country_code) setCountries(c => (c.includes(d.country_code!) ? c : [...c, d.country_code!]))
  }, [])

  useEffect(() => {
    if (!supabase) { const d = demoDiyas(); d.forEach(x => seen.current.add(x.id)); setDiyas(d); setTotal(d.length); setCountries([...new Set(d.map(x => x.country_code!))]); setStatus('ready'); return }
    const sb = supabase
    let channel: ReturnType<typeof sb.channel> | null = null; let cancelled = false
    ;(async () => {
      const [rows, stats] = await Promise.all([
        sb.from('diyas').select('*').order('created_at', { ascending: false }).limit(600),
        sb.rpc('diya_stats')])
      if (cancelled) return
      if (rows.error) { setStatus('error'); return }
      const list = rows.data as Diya[]; list.forEach(x => seen.current.add(x.id)); setDiyas(list)
      const s = stats.data as { total: number; countries: string[] } | null
      setTotal(s?.total ?? list.length); setCountries(s?.countries ?? [...new Set(list.map(x => x.country_code).filter(Boolean) as string[])]); setStatus('ready')
      channel = sb.channel('diyas-feed').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'diyas' }, p => add(p.new as Diya))
        .subscribe(st => setLive(st === 'SUBSCRIBED'))
    })().catch(() => setStatus('error'))
    return () => { cancelled = true; if (channel) sb.removeChannel(channel) }
  }, [add])

  /** Returns an error message, or null on success. */
  const light = useCallback(async (message: string, country: string, name: string, anon: boolean): Promise<string | null> => {
    const msg = cleanMessage(message)
    const row = { message: anon ? null : msg || null, country_code: country || null, display_name: anon ? null : cleanName(name) || null, anonymous_session_id: sessionId(), visual_style: Math.floor(Math.random() * 6) }
    if (!supabase) { add({ ...row, id: `local-${crypto.randomUUID()}`, created_at: new Date().toISOString() }); return null }
    const { data, error } = await supabase.from('diyas').insert(row).select().single()
    if (error) return error.message.includes('rate_limit') ? 'You have lit several diyas recently. Please wait a few minutes and try again.' : 'Your diya could not be saved. Check your connection and try again.'
    add(data as Diya); return null
  }, [add])

  return { diyas, total, countries, status, live, light, demo: isDemo }
}
