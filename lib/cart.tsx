'use client';
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { MENU } from './menu';

type Line = { id: string; name: string; price: number; q: number };
type Ctx = {
  qty: Record<string, number>; lines: Line[]; count: number; total: number;
  add: (id: string) => void; dec: (id: string) => void; clear: () => void;
  open: boolean; setOpen: (v: boolean) => void;
};
const CartCtx = createContext<Ctx>(null!);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }: { children: ReactNode }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem('acma-cart'); if (s) setQty(JSON.parse(s)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) try { localStorage.setItem('acma-cart', JSON.stringify(qty)); } catch {}
  }, [qty, ready]);

  const value = useMemo<Ctx>(() => {
    const lines = MENU.filter((m) => qty[m.id]).map((m) => ({ id: m.id, name: m.name, price: m.price, q: qty[m.id] }));
    return {
      qty, lines, open, setOpen,
      count: lines.reduce((a, l) => a + l.q, 0),
      total: lines.reduce((a, l) => a + l.q * l.price, 0),
      add: (id) => setQty((q) => ({ ...q, [id]: (q[id] || 0) + 1 })),
      dec: (id) => setQty((q) => {
        const next = { ...q }; const n = (next[id] || 0) - 1;
        if (n > 0) next[id] = n; else delete next[id];
        return next;
      }),
      clear: () => setQty({}),
    };
  }, [qty, open]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
