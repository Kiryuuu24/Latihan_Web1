export type Category = 'paket' | 'satuan' | 'pendamping' | 'minuman' | 'tambahan';
export type MenuItem = { id: string; name: string; category: Category; price: number; fav: boolean };

// Nomor WhatsApp penerima pesanan (format internasional tanpa +)
export const WA_NUMBER = '6281216136891';
export const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
export const rupiah = (n: number) => 'Rp' + Math.round(n).toLocaleString('id-ID');

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'paket', label: 'Paket nasi' },
  { key: 'satuan', label: 'Satuan' },
  { key: 'pendamping', label: 'Pendamping' },
  { key: 'minuman', label: 'Minuman' },
  { key: 'tambahan', label: 'Nasi & sambal' },
];

// Harga dalam ribuan (k). fav = bertanda bintang di poster menu.
const m = (category: Category, name: string, k: number, fav = false): MenuItem => ({
  id: `${category}-${name.toLowerCase().replace(/\s+/g, '-')}`, name, category, price: k * 1000, fav,
});

// Ubah harga / tambah menu cukup di daftar ini.
export const MENU: MenuItem[] = [
  m('paket', 'Paket Ayam Bakar Celup', 25, true),
  m('paket', 'Paket Ayam Goreng Serundeng', 23, true),
  m('paket', 'Paket Ikan Nila Bakar', 35),
  m('paket', 'Paket Ikan Nila Goreng', 30),
  m('paket', 'Paket Lele Bakar Celup', 22, true),
  m('paket', 'Paket Lele Goreng', 18),
  m('paket', 'Paket Iga Bakar Sapi', 55, true),
  m('paket', 'Paket Iga Goreng Sapi', 50),
  m('paket', 'Paket Cumi Asin', 27),
  m('satuan', 'Ayam Bakar Celup', 21),
  m('satuan', 'Ayam Goreng Serundeng', 19),
  m('satuan', 'Ikan Nila Bakar', 30),
  m('satuan', 'Ikan Nila Goreng', 25),
  m('satuan', 'Lele Bakar Celup', 18),
  m('satuan', 'Lele Goreng', 14),
  m('satuan', 'Iga Bakar Sapi', 50),
  m('satuan', 'Iga Goreng Sapi', 45),
  m('satuan', 'Cumi Asin', 22),
  m('pendamping', 'Cah Kangkung', 15, true),
  m('pendamping', 'Cah Toge', 15),
  m('pendamping', 'Telur Dadar', 8, true),
  m('pendamping', 'Tahu Goreng', 5),
  m('pendamping', 'Tempe Goreng', 5),
  m('pendamping', 'Pete Goreng', 10),
  m('pendamping', 'Kerupuk Putih', 6),
  m('minuman', 'Air Mineral', 5),
  m('minuman', 'Teh Pucuk', 5),
  m('minuman', 'Es Batu', 2),
  m('tambahan', 'Nasi Pedas', 8, true),
  m('tambahan', 'Nasi Putih', 5),
  m('tambahan', 'Sambal Bajak', 5, true),
  m('tambahan', 'Sambal Gami', 5, true),
];
