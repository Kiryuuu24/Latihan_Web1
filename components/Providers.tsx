'use client';
import { MotionConfig } from 'framer-motion';
import { CartProvider } from '@/lib/cart';

// reducedMotion="user": animasi dimatikan otomatis jika perangkat meminta gerak minimal
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>{children}</CartProvider>
    </MotionConfig>
  );
}
