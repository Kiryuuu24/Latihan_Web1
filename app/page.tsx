import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import NasiBox from '@/components/NasiBox';
import CartDrawer from '@/components/CartDrawer';
import { Specials, Footer } from '@/components/Sections';

export default function Home() {
  return (
    <main>
      <Hero />
      <Specials />
      <Menu />
      <NasiBox />
      <Footer />
      <CartDrawer />
    </main>
  );
}
