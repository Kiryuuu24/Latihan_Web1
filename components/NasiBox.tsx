'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { waLink } from '@/lib/menu';

const field = 'w-full rounded-xl border-2 border-white/40 bg-white/10 px-4 py-3 text-white placeholder:text-white/60';

export default function NasiBox() {
  const [f, setF] = useState({ nama: '', jumlah: '', tanggal: '', alamat: '', menu: '', catatan: '' });
  const [err, setErr] = useState('');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.nama.trim() || !f.jumlah || !f.tanggal) return setErr('Nama, jumlah box, dan tanggal wajib diisi.');
    setErr('');
    const msg = [
      'Halo Mang Asep, saya mau pesan nasi box:', '',
      `*Nama:* ${f.nama}`, `*Jumlah:* ${f.jumlah} box`, `*Tanggal & jam:* ${f.tanggal}`,
      f.menu && `*Menu:* ${f.menu}`, f.alamat && `*Alamat antar:* ${f.alamat}`, f.catatan && `*Catatan:* ${f.catatan}`,
    ].filter(Boolean).join('\n');
    window.open(waLink(msg), '_blank');
  };

  return (
    <section id="nasi-box" className="scroll-mt-4 py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
        <div>
          <motion.h2
            className="inline-block -rotate-2 bg-cream px-5 py-3 font-display text-4xl font-black italic text-brand md:text-5xl"
            initial={{ rotate: -8, scale: 0.8 }} whileInView={{ rotate: -2, scale: 1 }} viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 150, damping: 10 }}
          >
            Terima pesanan nasi box
          </motion.h2>
          <p className="mt-6 max-w-md text-lg text-white/90">
            Untuk acara kantor, pengajian, arisan, atau syukuran. Isi formulir, kami langsung terhubung lewat WhatsApp untuk konfirmasi harga dan menu.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input className={field} placeholder="Nama pemesan" value={f.nama} onChange={set('nama')} />
          <div className="grid grid-cols-2 gap-3">
            <input className={field} type="number" min={1} placeholder="Jumlah box" value={f.jumlah} onChange={set('jumlah')} />
            <input className={field} type="datetime-local" aria-label="Tanggal dan jam" value={f.tanggal} onChange={set('tanggal')} />
          </div>
          <input className={field} placeholder="Menu yang diinginkan, mis. ayam bakar celup" value={f.menu} onChange={set('menu')} />
          <textarea className={field} rows={2} placeholder="Alamat antar (kosongkan jika diambil)" value={f.alamat} onChange={set('alamat')} />
          <input className={field} placeholder="Catatan tambahan" value={f.catatan} onChange={set('catatan')} />
          {err && <p role="alert" className="font-semibold text-sun">{err}</p>}
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className="w-full rounded-full bg-sun py-4 text-lg font-bold text-ink">
            Kirim pesanan nasi box
          </motion.button>
        </form>
      </div>
    </section>
  );
}
