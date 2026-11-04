import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Art from './StoryArt'

type Chapter = { id: 'rama' | 'lakshmi' | 'krishna' | 'kali'; kicker: string; title: string; src: string; art: string; body: string[]; meaning: string; more: { q: string; a: string }[] }

const CHAPTERS: Chapter[] = [
  { id: 'rama', kicker: 'Chapter I · Dīpāvalī in Ayodhyā', title: 'The Return of Śrī Rāma', art: 'Stylised illustration of Rāma, Sītā, Lakṣmaṇa and Hanumān before the lamps of Ayodhyā',
    src: 'Told in the Vālmīki Rāmāyaṇa and retold across India in countless regional versions.',
    body: [
      'Daśaratha, king of Ayodhyā, prepares to crown his eldest son Rāma. But Queen Kaikeyī, urged by her maid Mantharā, reminds the king of two boons he once promised her. She asks that her son Bharata be crowned and that Rāma live in the forest for fourteen years. Bound by his word, Daśaratha is broken-hearted, yet Rāma accepts the exile without bitterness, to uphold his father’s promise. Sītā and Lakṣmaṇa insist on going with him.',
      'In the forest, Rāvaṇa, the ten-headed king of Laṅkā, sends the demon Mārīca as a golden deer. Rāma and Lakṣmaṇa are drawn away and Rāvaṇa abducts Sītā. In the search, Rāma meets Hanumān, the devoted minister of the vānara king Sugrīva. Hanumān leaps across the ocean, finds Sītā in the Aśoka grove, delivers Rāma’s ring as a sign, and returns with word of her. The vānaras build a bridge to Laṅkā, and in the great war Rāma defeats Rāvaṇa. Vibhīṣaṇa is crowned king of Laṅkā.',
      'When the fourteen years end, Rāma, Sītā and Lakṣmaṇa return to Ayodhyā in the flying chariot Puṣpaka. Bharata, who has ruled only in Rāma’s name, with Rāma’s sandals on the throne, welcomes them. In the tradition that links this homecoming to Diwali, the people greet them with rows of lamps. That is the meaning of Dīpāvalī: dīpa (lamp) + āvalī (row).'],
    meaning: 'Rāma keeps his word and stands for dharma (righteous order); Rāvaṇa’s power cannot stand against it. The lamps welcome rightful, compassionate rule home. Many Hindus, especially in North India, remember this on Diwali night.',
    more: [
      { q: 'Why is this story tied to Diwali?', a: 'Vālmīki narrates the return, but the Diwali dating is a living devotional and local tradition rather than something fixed in his text. It is strongest in North India, and today’s grand Dīpotsav in Ayodhyā continues it. Other communities remember different stories on the same festival, as the next chapters show.' },
      { q: 'Dussehra and Diwali: what is the difference?', a: 'In this tradition, Rāma’s victory over Rāvaṇa is remembered at Vijayādaśamī (Dussehra), and Diwali, about three weeks later in the lunar calendar, remembers the homecoming.' },
      { q: 'Why is Hanumān so loved?', a: 'He is the model of bhakti (devotion) and selfless service: strength used wholly for another’s good. His leap, his search for Sītā and his loyalty are retold and worshipped throughout India.' }] },
  { id: 'lakshmi', kicker: 'Chapter II · The Night of Lakṣmī Pūjā', title: 'Maa Lakṣmī, Goddess of Prosperity', art: 'Stylised illustration of Maa Lakṣmī on a lotus, flanked by elephants and falling gold coins',
    src: 'Told in the Viṣṇu Purāṇa and the Bhāgavata Purāṇa (the churning of the ocean).',
    body: [
      'Lakṣmī, also called Śrī, is the goddess of prosperity, fortune, beauty and auspiciousness (śrī, maṅgala). She is the consort of Viṣṇu, and in many traditions, such as Śākta and Śrī Vaiṣṇava devotion, she is revered as a supreme form of the Divine in her own right.',
      'The Purāṇas tell of Samudra Manthana, the churning of the cosmic ocean. After a curse on Indra, the gods lose strength and śrī, and the asuras gain the upper hand. Viṣṇu advises the gods to churn the Kṣīrasāgara, the ocean of milk, for amṛta (nectar), using Mount Mandara as the rod and the serpent Vāsuki as the rope, with asuras pulling on the other end. Many things arise: the poison Kālakūṭa, which Śiva drinks to protect the world, the wish-granting cow Kāmadhenu, the elephant Airāvata, Dhanvantari bearing amṛta, and Lakṣmī, radiant and seated on a lotus, who chooses Viṣṇu and garlands him.',
      'On Diwali night, in many communities the new-moon night, families perform Lakṣmī Pūjā at dusk. Homes are cleaned and decorated, doorways hung with mango leaves and marigolds, rangoli drawn and lamps lit at every threshold, in the belief that Lakṣmī visits homes that are clean, bright and welcoming. Gaṇeśa is usually invoked first, to remove obstacles.'],
    meaning: 'Prosperity in Hindu thought is not only money. Śrī includes health, grain, learning, courage, generosity and good character. Tradition speaks of Aṣṭalakṣmī, eight forms that include food, victory, knowledge and progeny as well as wealth.',
    more: [
      { q: 'What do the lotus, coins and elephants mean?', a: 'The lotus rises from mud untouched: purity, beauty and non-attachment. Coins streaming from her open hand say wealth is meant to flow, and to be shared (dāna). In the form of Gajalakṣmī, elephants bathe her with water: royal fortune, rain and fertility.' },
      { q: 'Why clean and light the home?', a: 'The welcome is both practical and sacred. A clean, ordered, lit house is an auspicious place for abundance, and the work of preparing it is itself an offering.' },
      { q: 'Is Lakṣmī Pūjā the same everywhere?', a: 'No. Households follow different customs, and in Bengal, for instance, Lakṣmī is worshipped separately on Kojāgarī Pūrṇimā, the full moon days earlier (see Chapter IV).' }] },
  { id: 'krishna', kicker: 'Chapter III · Naraka Chaturdaśī', title: 'Śrī Kṛṣṇa and the Defeat of Narakāsura', art: 'Stylised illustration of Śrī Kṛṣṇa with the Sudarśana chakra and Satyabhāmā with her bow',
    src: 'Told in the Bhāgavata Purāṇa (Book 10, chapter 59), the Viṣṇu Purāṇa and the Harivaṁśa, with regional variations.',
    body: [
      'Narakāsura, also called Bhauma, “son of the Earth” (Bhūmi), was king of Prāgjyotiṣa, associated with the Assam region. Strengthened by a boon, he oppressed the devas and the people. He seized the earrings of the goddess Aditi and held captive 16,100 women.',
      'The gods turn to Kṛṣṇa. He rides Garuḍa to Prāgjyotiṣa with his consort Satyabhāmā, breaks through the fortifications, slays the five-headed Mura, and then confronts Naraka. In the Bhāgavata Purāṇa, Kṛṣṇa severs Naraka’s head with the Sudarśana chakra. Bhūmi returns Aditi’s earrings, and Kṛṣṇa frees the captives.',
      'Several regional tellings, especially in South India, give Satyabhāmā a larger role. In these, Naraka could be killed only by his mother, and Satyabhāmā, regarded as an aspect of Bhūmi Devī, fires the final arrow when Kṛṣṇa swoons in battle. In some versions Naraka, dying, asks that his death be celebrated with light, which links the story to the festival.',
      'Naraka Chaturdaśī, the fourteenth day of the waning moon, falls the day before the main new-moon night. Before dawn, many take a ritual oil-bath (abhyaṅga snāna) and light lamps. In Tamil Nadu this is Deepavali itself.'],
    meaning: 'Tyranny is ended, captives are freed and dharma is restored. Naraka is also read inwardly as ego and cruelty born of pride, which must be defeated before the light of the new day.',
    more: [
      { q: 'Which version is “the” version?', a: 'The Purāṇic account (Kṛṣṇa slays Naraka with the chakra) and the regional accounts (Satyabhāmā strikes the final blow) are both held by devotees. Neither cancels the other; they are different traditions of telling.' },
      { q: 'Why the early-morning oil-bath?', a: 'It marks purification and a fresh start before dawn. In many South Indian homes it is followed by new clothes, sweets and fireworks, as the day of victory over darkness.' },
      { q: 'Who is Satyabhāmā?', a: 'One of Kṛṣṇa’s principal queens, known for her courage and spirit. She appears as a warrior beside him, and in some devotional traditions is an embodiment of the Earth goddess.' }] },
  { id: 'kali', kicker: 'Chapter IV · Kālī Pūjā', title: 'Maa Kālī and the Night of Fearless Light', art: 'Stylised illustration of Maa Kālī standing over Śiva beneath a new-moon sky',
    src: 'Rooted in the Devī Māhātmya (Mārkaṇḍeya Purāṇa) and the Śākta and Tantric traditions of Bengal, Odisha, Assam and Mithila.',
    body: [
      'Kālī (from kāla, time, and kālā, dark) is a fierce form of the Divine Mother in Śaktism, which worships the Goddess as the supreme reality. In Bengal, Odisha, Assam and Mithila she is worshipped as Śyāmā Kālī on the new-moon night of the Diwali period.',
      'In the Devī Māhātmya, as the Goddess Durgā battles the demons Caṇḍa and Muṇḍa, Kālī springs from her furious brow. Facing Raktabīja, whose every drop of blood becomes another demon, Kālī drinks the blood before it can reach the ground, and the demon is defeated.',
      'Her iconography is rich with meaning: a garland of skulls, a sword, boon-giving and fear-dispelling hands, and a lolling tongue. One popular Bengali tradition says that in her ecstatic dance of destruction she stepped on her husband Śiva, who lay down before her to calm her, and, realising, she bit her tongue in shame. Her dark form is read as the infinite beyond time and form.',
      'Kālī Pūjā is observed at night, often at midnight, with red hibiscus, lamps, sweets and devotional songs. For devotees she is Mā, a mother whose fierceness protects her children, as in the songs of the Bengali poet Rāmprasād Sen.'],
    meaning: 'Kālī’s fierce appearance does not stand for evil. It represents the destruction of evil, ego, ignorance and fear. She is worshipped for fearlessness and liberation.',
    more: [
      { q: 'How is it different from Lakṣmī Pūjā?', a: 'Lakṣmī Pūjā is typically a household worship at dusk, inviting prosperity and good fortune. Kālī Pūjā is a nocturnal rite, seeking protection, courage and freedom from fear and ego, with temple and community celebrations, especially in Bengal.' },
      { q: 'Is it part of Diwali?', a: 'It takes place on the same new-moon night, and in the regions where it is observed, Kālī Pūjā is the central worship of Diwali, with lamps and festivities as elsewhere.' },
      { q: 'Why is she dark?', a: 'In Śākta and Tantric thought, darkness is the unbounded: the source into which all forms dissolve and from which they arise. It is not a symbol of evil.' }] },
]

const REGIONS = [
  { n: 'North & West India', t: 'Rāma’s homecoming, Lakṣmī Pūjā', d: 'In much of North India, Diwali remembers Rāma’s return to Ayodhyā. Families perform Lakṣmī–Gaṇeśa Pūjā, light rows of lamps, and visit one another with sweets. Dhanteras (Dhanatrayodaśī) precedes it, and Naraka Chaturdaśī is often called Chhoti Diwali. In Gujarat and among many business communities, Chopḍā Pūjan blesses new account books and the new year (Vikram Samvat) begins the day after.' },
  { n: 'Bengal & East', t: 'Kālī Pūjā', d: 'In Bengal, Odisha, Assam and Mithila, the new-moon night is for Kālī Pūjā: grand pandals, midnight worship, lamps, and devotional music. Lakṣmī is honoured separately on Kojāgarī Pūrṇimā earlier. Bengalis also mark Bhāi Phōṭā, and Odisha has its own ancestral rites at this time.' },
  { n: 'South India', t: 'Naraka Chaturdaśī', d: 'In many South Indian traditions, Kṛṣṇa’s victory over Narakāsura is the heart of Diwali. The day begins before sunrise with an oil-bath, new clothes and lamps, followed by sweets and savouries. In Tamil Nadu, Deepavali falls on this Chaturdaśī. Lakṣmī Pūjā also continues in many homes.' },
  { n: 'Nepal', t: 'Tihār: five days', d: 'Tihār (Yamapañcaka) honours five relationships over five days. Kāg Tihār honours crows as messengers. Kukur Tihār honours dogs, loyal guardians. On Gāī Tihār people honour cows, and Lakṣmī Pūjā follows at night with lamps in every home. Govardhan Pūjā (and Mha Pūjā among the Newar) is followed by Bhāi Ṭikā, when sisters bless brothers with a tika.' },
  { n: 'Govardhan & Bhāi Dūj', t: 'Across many regions', d: 'Govardhan Pūjā, the day after Diwali, remembers Kṛṣṇa lifting Mount Govardhan to shelter Vrindavan from Indra’s storm; devotees offer a mountain of food (Annakūṭa). Bhāi Dūj, or Yama Dvitīyā, honours the bond of brothers and sisters, linked to Yama’s visit to his sister Yamunā. In Maharashtra and elsewhere, Bali Pratipadā remembers King Bali.' }]
const DAYS = [['Dhanteras', 'Dhanatrayodaśī'], ['Naraka Chaturdaśī', 'Oil-bath, Kṛṣṇa’s victory'], ['Lakṣmī Pūjā', 'The new-moon night'], ['Govardhan Pūjā', 'Annakūṭa, Bali Pratipadā'], ['Bhāi Dūj', 'Siblings’ day']]
const SYMBOLS = [
  ['दीप', 'Dīpa · the lamp', 'A lamp gives light by burning its own oil: knowledge (jñāna) dispelling ignorance, hope in the darkest night. The Bṛhadāraṇyaka Upaniṣad prayer says tamaso mā jyotir gamaya, “lead me from darkness to light.”'],
  ['रंगोली', 'Raṅgolī · welcome at the door', 'Patterns of coloured powder, rice flour and flowers (kolam in Tamil Nadu, alpana in Bengal) welcome guests and invite auspiciousness. Lotus motifs and little footprints invite Lakṣmī in.'],
  ['लक्ष्मी पूजा', 'Lakṣmī Pūjā · gratitude', 'Worship of the source of sustenance. It is thanks for what one has and a prayer that it be used well, often with blessing of tools, books and accounts.'],
  ['गणेश पूजा', 'Gaṇeśa Pūjā · wisdom', 'Gaṇeśa, Vighnahartā, the remover of obstacles and lord of beginnings, is invoked first. Paired with Lakṣmī, he reminds us that wealth needs wisdom (buddhi) to guide it.'],
  ['मिठाई', 'Mithai · sweetness shared', 'Sharing sweets is generosity and togetherness. The Taittirīya Upaniṣad teaches atithi devo bhava, “the guest is as God,” and Diwali visits often mend old quarrels.'],
  ['नव', 'New beginnings · renewal', 'Homes are cleaned, debts settled, new clothes worn and new account books opened. It is a time to reflect and to renew the commitment to live by dharma.']]

function Chapter({ c, i }: { c: Chapter; i: number }) {
  return (
    <motion.article id={c.id} initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
      className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16">
      <div className={i % 2 ? 'md:order-2' : ''}><Art kind={c.id} label={c.art} /></div>
      <div>
        <p className="text-sm font-bold uppercase tracking-[.2em] text-saffron">{c.kicker}</p>
        <h3 className="mt-2 font-display text-3xl font-black text-gold sm:text-5xl">{c.title}</h3>
        <p className="mt-2 text-sm italic text-cream/70">{c.src}</p>
        {c.body.map((p, k) => <p key={k} className="mt-4 text-lg leading-relaxed text-cream/90">{p}</p>)}
        <p className="mt-5 border-l-4 border-gold bg-gold/10 p-4 text-cream"><b className="text-gold">What it means. </b>{c.meaning}</p>
        <div className="mt-5 space-y-2">{c.more.map(m => (
          <details key={m.q} className="group rounded-2xl border border-gold/30 bg-royal/30 p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-gold">{m.q}<ChevronDown size={20} className="shrink-0 transition group-open:rotate-180" /></summary>
            <p className="mt-3 text-cream/90">{m.a}</p></details>))}</div>
      </div>
    </motion.article>)
}

export default function Stories() {
  const [r, setR] = useState(0)
  const reg = REGIONS[r]
  return (
    <section id="stories" className="bg-plum">
      <div className="px-5 pb-6 pt-24 text-center">
        <p className="text-sm font-bold uppercase tracking-[.3em] text-saffron">✦ Hindu stories & traditions ✦</p>
        <h2 className="mx-auto mt-3 max-w-4xl font-display text-4xl font-black leading-tight text-gold sm:text-7xl">THE STORIES BEHIND THE LIGHT</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-cream/90 sm:text-xl">Discover the sacred stories, divine celebrations, and timeless traditions that give Diwali its meaning.</p>
        <p className="mx-auto mt-4 max-w-xl text-sm text-cream/60">Diwali follows the lunar calendar and is celebrated differently by different communities. The illustrations are stylised artwork, not copies of any one tradition’s sacred images.</p>
      </div>
      {CHAPTERS.map((c, i) => <Chapter key={c.id} c={c} i={i} />)}

      <div className="mx-auto max-w-5xl px-5 py-16">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-saffron">Chapter V · Many Diwalis</p>
        <h3 className="mt-2 font-display text-3xl font-black text-gold sm:text-5xl">Diwali is not celebrated the same way everywhere</h3>
        <p className="mt-3 max-w-3xl text-lg text-cream/90">Diwali is a festival period of several days. The observances below may fall on different days depending on region, community and the lunar calendar, and the same day can carry different meanings.</p>
        <ol className="mt-6 flex gap-3 overflow-x-auto pb-2" aria-label="The five days of Diwali">{DAYS.map(([a, b], k) => <li key={a} className="min-w-[9.5rem] rounded-3xl bg-gradient-to-br from-saffron to-pink p-4 text-plum"><span className="font-display text-3xl font-black">{k + 1}</span><b className="block">{a}</b><span className="text-sm">{b}</span></li>)}</ol>
        <div role="tablist" aria-label="Regions" className="mt-8 flex flex-wrap gap-2">{REGIONS.map((x, k) => (
          <button key={x.n} role="tab" aria-selected={r === k} onClick={() => setR(k)} className={`rounded-full px-4 py-2 font-bold transition ${r === k ? 'bg-gold text-plum' : 'border border-gold/40 text-gold hover:bg-gold/10'}`}>{x.n}</button>))}</div>
        <div role="tabpanel" className="mt-4 rounded-[2rem] rounded-tl-md border border-gold/30 bg-royal/40 p-6 sm:p-8">
          <h4 className="font-display text-2xl font-black text-gold">{reg.t}</h4><p className="mt-3 text-lg leading-relaxed text-cream/90">{reg.d}</p></div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-16">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-saffron">Chapter VI · From story to practice</p>
        <h3 className="mt-2 font-display text-3xl font-black text-gold sm:text-5xl">The symbolism of Diwali</h3>
        <div className="mt-8 divide-y divide-gold/20">{SYMBOLS.map(([g, t, d]) => (
          <motion.div key={t} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
            <p className="text-4xl text-saffron" lang="hi">{g}</p><div><h4 className="font-display text-xl font-black text-gold">{t}</h4><p className="mt-1 text-lg text-cream/90">{d}</p></div></motion.div>))}</div>
      </div>

      <div className="bg-royal px-5 py-24 text-center">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-gold">Chapter VII</p>
        <h3 className="mx-auto mt-2 max-w-3xl font-display text-4xl font-black sm:text-6xl">A festival with many stories, one light</h3>
        <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-cream/90">Rāma’s homecoming, Lakṣmī’s arrival, Kṛṣṇa’s victory over Naraka, Kālī’s fearless night: no single story is <i>the</i> Diwali story, and no community’s understanding is the only one. Each is held sincerely, in its own region, family and tradition.</p>
        <p className="mx-auto mt-4 max-w-3xl text-xl leading-relaxed text-cream/90">Yet certain themes return in every telling, and every lamp on every threshold says them again.</p>
        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">{['The triumph of dharma', 'The removal of darkness', 'Devotion', 'Gratitude', 'Renewal', 'Hope'].map(t => <li key={t} className="rounded-full border-2 border-gold px-5 py-2 font-bold text-gold">{t}</li>)}</ul>
      </div>
    </section>)
}
