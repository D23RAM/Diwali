export interface Diya { id: string; created_at: string; message: string | null; country_code: string | null; anonymous_session_id: string; visual_style: number; display_name?: string | null }
export const COUNTRIES = ['SR','IN','NL','GY','TT','MU','FJ','ZA','SG','MY','GB','US','CA','AU','NP','LK','KE','AE','DE','FR','BR','JM','ID','TH','BD','PK','NZ','JP','ES','IT','MX','NG','GH','QA','CH','SE']
export const countryName = (c: string) => { try { return new Intl.DisplayNames(['en'], { type: 'region' }).of(c) ?? c } catch { return c } }
export const flag = (c: string) => String.fromCodePoint(...[...c].map(ch => 127397 + ch.charCodeAt(0)))
export function hash(s: string, salt = 0) { let h = 2166136261 ^ salt; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) } return (h >>> 0) / 4294967295 }
export const layout = (id: string) => ({ x: 3 + hash(id, 1) * 92, y: 6 + hash(id, 2) * 80, size: 30 + hash(id, 3) * 34, dur: 1.8 + hash(id, 4) * 1.8, delay: -hash(id, 5) * 3 })
export function sessionId() {
  try { let s = localStorage.getItem('deepotsav_sid'); if (!s) { s = crypto.randomUUID(); localStorage.setItem('deepotsav_sid', s) } return s } catch { return crypto.randomUUID() }
}
export const cleanMessage = (m: string) => m.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 280)
/** [lat, lng] centre of each selectable country. */
export const COORDS: Record<string, [number, number]> = { SR:[4,-56],IN:[21,78],NL:[52.2,5.3],GY:[5,-59],TT:[10.5,-61.3],MU:[-20.3,57.6],FJ:[-17.8,178],ZA:[-29,24],SG:[1.35,103.8],MY:[4.2,102],GB:[54,-2],US:[39,-98],CA:[56,-106],AU:[-25,134],NP:[28.4,84],LK:[7.9,80.7],KE:[0.2,38],AE:[24,54],DE:[51,10],FR:[46.5,2.5],BR:[-10,-52],JM:[18.1,-77.3],ID:[-2,118],TH:[15,101],BD:[23.7,90.3],PK:[30,70],NZ:[-41,174],JP:[36,138],ES:[40,-4],IT:[42.5,12.5],MX:[23,-102],NG:[9,8],GH:[7.9,-1],QA:[25.3,51.2],CH:[46.8,8.2],SE:[62,15] }
export const cleanName = (n: string) => n.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 40)
/** "Asha · 🇸🇷 Suriname", or "Anonymous" when the visitor chose to stay anonymous. */
export const byline = (d: Diya) => [d.display_name ?? 'Anonymous', d.country_code ? `${flag(d.country_code)} ${countryName(d.country_code)}` : null].filter(Boolean).join(' · ')
