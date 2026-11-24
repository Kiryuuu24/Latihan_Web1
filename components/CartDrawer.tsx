'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCart } from '@/lib/cart';
import { rupiah, waLink } from '@/lib/menu';

function Num({ v }: { v: number }) {
  const mv = useMotionValue(v);
  const sp = useSpring(mv, { stiffness: 120, damping: 20 });
  const t = useTransform(sp, (n) => rupiah(n));
  useEffect(() => { mv.set(v); }, [v, mv]);
  return <motion.span>{t}</motion.span>;
}

export default function CartDrawer() {
  const { lines, count, total, add, dec, clear, open, setOpen } = useCart();
  const [name, setName] = useState('');
  const [method, setMethod] = useState<'ambil' | 'antar'>('ambil');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [err, setErr] = useState('');

  const send = () => {
    if (!name.trim()) return setErr('Isi nama pemesan dulu.');
    if (method === 'antar' && !address.trim()) return setErr('Isi alamat pengantaran.');
    setErr('');
    const msg = [
      'Halo Mang Asep, saya mau pesan:', '',
      `*Nama:* ${name}`,
      `*Metode:* ${method === 'ambil' ? 'Ambil di tempat' : 'Antar'}`,
      method === 'antar' ? `*Alamat:* ${address}` : '',
      '', '*Pesanan:*',
      ...lines.map((l) => `- ${l.q}x ${l.name} (${rupiah(l.q * l.price)})`),
      note ? `\n*Catatan:* ${note}` : '',
      `\n*Total:* ${rupiah(total)}`,
    ].filter((x) => x !== '').join('\n');
    window.open(waLink(msg), '_blank');
  };

  return (
    <>
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button
            initial={{ scale: 0, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0 }}
            whileTap={{ scale: 0.92 }} onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border-2 border-ink bg-sun px-5 py-3 font-bold text-ink shadow-[4px_4px_0_#2B0805]"
          >
            <motion.span key={count} initial={{ scale: 1.8 }} animate={{ scale: 1 }} className="grid h-7 w-7 place-items-center rounded-full bg-ink text-sm text-white">{count}</motion.span>
            Lihat pesanan · {rupiah(total)}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-ink/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside
              role="dialog" aria-label="Pesanan kamu"
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-t-3xl bg-cream p-6"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, i) => { if (i.offset.y > 120) setOpen(false); }}
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-ink/30" />
              <div className="flex items-center justify-between">
                <h2 className="font-display text-3xl font-black text-brand">Pesanan kamu</h2>
                <button onClick={() => setOpen(false)} className="font-semibold underline">Tutup</button>
              </div>

              {lines.length === 0 ? (
                <p className="py-10 text-center text-ink/70">Belum ada pesanan. Pilih menu dulu.</p>
              ) : (
                <>
                  <ul className="mt-4 divide-y divide-ink/10">
                    <AnimatePresence initial={false}>
                      {lines.map((l) => (
                        <motion.li key={l.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="flex items-center justify-between gap-3 overflow-hidden py-3">
                          <div><p className="font-semibold">{l.name}</p><p className="text-sm text-ink/70">{rupiah(l.price)}</p></div>
                          <div className="flex items-center gap-2 rounded-full bg-ink px-2 py-1 text-white">
                            <button onClick={() => dec(l.id)} aria-label={`Kurangi ${l.name}`} className="h-7 w-7 text-lg">−</button>
                            <span className="w-5 text-center font-bold">{l.q}</span>
                            <button onClick={() => add(l.id)} aria-label={`Tambah ${l.name}`} className="h-7 w-7 text-lg">+</button>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  <div className="mt-4 space-y-3">
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama pemesan" className="w-full rounded-xl border-2 border-ink/20 px-4 py-3" />
                    <div className="grid grid-cols-2 gap-2">
                      {(['ambil', 'antar'] as const).map((k) => (
                        <button key={k} onClick={() => setMethod(k)} aria-pressed={method === k}
                          className={`rounded-xl border-2 px-4 py-3 font-semibold ${method === k ? 'border-brand bg-brand text-white' : 'border-ink/20'}`}>
                          {k === 'ambil' ? 'Ambil di tempat' : 'Diantar'}
                        </button>
                      ))}
                    </div>
                    {method === 'antar' && <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat pengantaran" rows={2} className="w-full rounded-xl border-2 border-ink/20 px-4 py-3" />}
                    <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Catatan, mis. tidak pedas" className="w-full rounded-xl border-2 border-ink/20 px-4 py-3" />
                  </div>

                  {err && <p role="alert" className="mt-3 font-semibold text-brand">{err}</p>}
                  <div className="mt-5 flex items-center justify-between text-xl font-black">
                    <span>Total</span><Num v={total} />
                  </div>
                  <motion.button whileTap={{ scale: 0.96 }} onClick={send} className="mt-4 w-full rounded-full bg-brand py-4 text-lg font-bold text-white">
                    Kirim pesanan lewat WhatsApp
                  </motion.button>
                  <button onClick={clear} className="mt-3 w-full text-sm underline">Kosongkan pesanan</button>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
