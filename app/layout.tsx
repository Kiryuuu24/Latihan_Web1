import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const display = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['700', '900'], style: ['normal', 'italic'] });
const body = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Ayam Celup Mang Asep | Ayam Bakar Celup, Iga Bakar & Nasi Box',
  description: 'Menu lengkap Ayam Celup Mang Asep: ayam bakar celup, iga bakar sapi, ikan nila, lele, dan cumi asin. Pesan langsung lewat WhatsApp. Terima pesanan nasi box.',
  openGraph: { title: 'Ayam Celup Mang Asep', description: 'Ayam bakar celup, iga bakar, dan nasi box. Pesan lewat WhatsApp.', type: 'website', locale: 'id_ID' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="bg-brand font-sans text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
