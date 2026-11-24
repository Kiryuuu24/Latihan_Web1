'use client';
import { motion } from 'framer-motion';
import { waLink } from '@/lib/menu';

const specials = [
  { t: 'Special Ayam Celup', e: '🍗', isi: ['Ayam bakar', 'Nasi putih', 'Kailan', 'Sambal bara atau bajak'] },
  { t: 'Special Iga Bakar Sapi', e: '🍖', isi: ['Daging iga bakar', 'Nasi putih', 'Kailan', 'Sambal bara atau bajak'] },
  { t: 'Special Ikan Nila Bakar', e: '🐟', isi: ['Ikan nila bakar', 'Nasi putih', 'Kailan', 'Sambal bara atau bajak'] },
];

export function Specials() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-4xl font-black text-brand md:text-5xl">Paket spesial</h2>
        <p className="mt-2 text-ink/70">Tiga paket yang paling sering dipesan.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {specials.map((s, i) => (
            <motion.article
              key={s.t}
              className="rounded-3xl border-2 border-ink bg-white p-6 shadow-[6px_6px_0_#2B0805]"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.12, type: 'spring', stiffness: 90 }}
              whileHover={{ y: -6, rotate: -1 }}
            >
              <div className="text-6xl">{s.e}</div>
              <h3 className="mt-3 font-display text-2xl font-black">{s.t}</h3>
              <p className="text-sun" aria-label="Bintang lima">★★★★★</p>
              <ul className="mt-3 space-y-1 text-ink/80">{s.isi.map((x) => <li key={x}>{x}</li>)}</ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="text-white">
      <div className="checker" aria-hidden />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 pb-28 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-3xl font-black">Ayam Celup Mang Asep</p>
          <p className="mt-1 text-white/85">Terima pesanan nasi box. WhatsApp 0812-1613-6891</p>
          {/* TODO: isi alamat dan jam buka */}
          <p className="text-white/70">Alamat dan jam buka: segera diisi.</p>
        </div>
        <motion.a
          href={waLink('Halo Mang Asep, saya mau tanya menu.')} target="_blank" rel="noreferrer"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="w-fit rounded-full bg-sun px-6 py-3 font-bold text-ink"
        >
          Chat WhatsApp
        </motion.a>
      </div>
    </footer>
  );
}
