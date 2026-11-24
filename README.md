# Ayam Celup Mang Asep (Website)

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion. Pemesanan dikirim lewat WhatsApp, tanpa backend.

## Menjalankan
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Mengubah konten
- **Menu & harga:** `lib/menu.ts` (harga dalam ribuan). Nomor WhatsApp: `WA_NUMBER` di berkas yang sama.
- **Alamat & jam buka:** `components/Sections.tsx` (komponen `Footer`).
- **Warna:** `tailwind.config.ts`.

## Asumsi yang perlu dikonfirmasi
- Nasi dan sambal dijual sebagai item terpisah (tab "Nasi & sambal"); harga paket dianggap belum menambah item itu.
- Tanda bintang di poster ditampilkan sebagai badge "Favorit".
- Kartu "Special Ikan Nila Bakar" di poster tertulis "Daging Iga Bakar"; di sini ditulis "Ikan nila bakar".
- Menyebut "Sambal bara" di kartu spesial, sementara daftar menu hanya Bajak dan Gami.

## Deploy
Push ke GitHub lalu impor di Vercel (tanpa konfigurasi tambahan).
