'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

const words = ['Ayam', 'Celup', 'Mang', 'Asep'];

export default function Hero() {
  const { scrollY } = useScroll();
  const bowlY = useTransform(scrollY, [0, 500], [0, 90]);

  return (
    <header className="relative overflow-hidden text-white">
      <div className="checker" aria-hidden />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.1fr_1fr] md:py-24">
        <div>
          <h1 className="font-display text-6xl font-black leading-[0.9] md:text-8xl">
            {words.map((w, i) => (
              <motion.span
                key={w}
                className={`mr-4 inline-block ${w === 'Celup' ? 'italic text-sun' : ''}`}
                initial={{ y: 60, opacity: 0, rotate: -4 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.1 + i * 0.12 }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="mt-6 max-w-md text-lg text-white/90"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          >
            Ayam bakar celup, iga sapi, ikan nila, dan lele. Pilih menunya, kirim pesanan lewat WhatsApp.
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            <motion.a
              href="#menu" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 0 0 rgba(255,199,44,.7)', '0 0 0 14px rgba(255,199,44,0)'] }}
              transition={{ boxShadow: { duration: 1.6, repeat: Infinity } }}
              className="rounded-full bg-sun px-7 py-3.5 text-lg font-bold text-ink"
            >
              Pesan sekarang
            </motion.a>
            <motion.a href="#nasi-box" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-white px-7 py-3.5 text-lg font-bold">
              Pesan nasi box
            </motion.a>
          </motion.div>
        </div>

        {/* Momen utama: ayam dicelup ke sambal, berulang */}
        <motion.div style={{ y: bowlY }} className="relative mx-auto h-72 w-72 md:h-[26rem] md:w-[26rem]" aria-hidden>
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 text-[8rem] md:text-[12rem]"
            animate={{ y: ['0%', '38%', '38%', '0%'], rotate: [-8, 4, 4, -8] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.45, 0.6, 1] }}
          >
            🍗
          </motion.div>
          <div className="absolute inset-x-6 bottom-0 z-10 h-36 overflow-hidden rounded-b-[6rem] rounded-t-3xl bg-cream shadow-2xl md:h-48">
            <div className="mx-auto mt-3 h-6 w-[85%] rounded-full bg-deep md:h-8" />
          </div>
          <motion.span
            className="absolute -right-2 top-10 z-20 rounded-full bg-sun px-4 py-2 text-sm font-bold text-ink"
            animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 3, repeat: Infinity }}
          >
            Mulai Rp14rb
          </motion.span>
        </motion.div>
      </div>
      <div className="checker" aria-hidden />
    </header>
  );
}
