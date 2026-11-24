'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORIES, MENU, rupiah, Category } from '@/lib/menu';
import { useCart } from '@/lib/cart';

export default function Menu() {
  const [cat, setCat] = useState<Category>('paket');
  const [q, setQ] = useState('');
  const { qty, add, dec } = useCart();
  const items = MENU.filter((m) => (q ? m.name.toLowerCase().includes(q.toLowerCase()) : m.category === cat));

  return (
    <section id="menu" className="scroll-mt-4 bg-white py-16">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-4xl font-black text-brand md:text-5xl">Menu lengkap</h2>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist">
            {CATEGORIES.map((c) => (
              <button
                key={c.key} role="tab" aria-selected={!q && cat === c.key}
                onClick={() => { setCat(c.key); setQ(''); }}
                className="relative rounded-full px-4 py-2 font-semibold"
              >
                {!q && cat === c.key && (
                  <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-brand" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                <span className={`relative ${!q && cat === c.key ? 'text-white' : 'text-ink'}`}>{c.label}</span>
              </button>
            ))}
          </div>
          <input
            value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari menu, mis. iga"
            aria-label="Cari menu" className="rounded-full border-2 border-ink/20 px-5 py-2.5 md:w-64"
          />
        </div>

        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((m) => (
              <motion.div
                key={m.id} layout
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className="flex items-center justify-between gap-3 rounded-2xl border-2 border-ink bg-cream p-4"
              >
                <div>
                  <p className="font-semibold leading-snug">{m.name}</p>
                  <p className="mt-1 text-lg font-black text-brand">{rupiah(m.price)}</p>
                  {m.fav && <span className="mt-1 inline-block rounded-full bg-sun px-2 py-0.5 text-xs font-bold">★ Favorit</span>}
                </div>
                {qty[m.id] ? (
                  <div className="flex items-center gap-2 rounded-full bg-ink px-2 py-1 text-white">
                    <button onClick={() => dec(m.id)} aria-label={`Kurangi ${m.name}`} className="h-8 w-8 text-xl">−</button>
                    <motion.span key={qty[m.id]} initial={{ scale: 1.6 }} animate={{ scale: 1 }} className="w-5 text-center font-bold">{qty[m.id]}</motion.span>
                    <button onClick={() => add(m.id)} aria-label={`Tambah ${m.name}`} className="h-8 w-8 text-xl">+</button>
                  </div>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.08 }} onClick={() => add(m.id)}
                    className="shrink-0 rounded-full bg-brand px-4 py-2 font-bold text-white"
                  >
                    Tambah
                  </motion.button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {items.length === 0 && <p className="mt-8 text-ink/70">Menu &quot;{q}&quot; tidak ditemukan. Coba kata lain, mis. ayam atau lele.</p>}
      </div>
    </section>
  );
}
