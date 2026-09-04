"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BAKERY_ITEMS,
  BUSINESSES,
  SEED_ORDERS,
  SPOTS,
  TRUCK_ITEMS,
  TRUCK_WEEK,
  WEEKLY_CANDIDATES,
  type BusinessKey,
  type Item,
  type Order,
  type OrderStatus,
  type Spot,
  type WeekStop,
} from "./data";

export type View = "customer" | "staff";
type CartLine = { id: string; qty: number };

type Blast = { id: number; body: string; sent: number };

type State = {
  business: BusinessKey;
  view: View;
  items: Record<BusinessKey, Item[]>;
  orders: Record<BusinessKey, Order[]>;
  cart: Record<BusinessKey, CartLine[]>;
  spot: Spot;
  subscribers: Record<BusinessKey, number>;
  blasts: Blast[];
  /** Order the visitor placed during the demo, so the customer view can track it. */
  myOrderId: string | null;
  toast: string | null;
  week: WeekStop[];
  todayIndex: number | null;
  nowMinutes: number | null;
};

type Store = State & {
  setBusiness: (b: BusinessKey) => void;
  setView: (v: View) => void;
  toggleSoldOut: (itemId: string) => void;
  restock: (itemId: string, amount: number) => void;
  addWeeklyItem: (candidateId: string) => void;
  removeItem: (itemId: string) => void;
  setSpot: (spot: Spot) => void;
  setDayStop: (dayIndex: number, spotId: string | null) => void;
  sendBlast: (body: string) => void;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  placeOrder: (name: string, phone: string) => void;
  advanceOrder: (orderId: string) => void;
  subscribe: () => void;
  showToast: (msg: string) => void;
  // derived
  currentItems: Item[];
  currentOrders: Order[];
  currentCart: CartLine[];
  cartTotal: number;
  cartCount: number;
  myOrder: Order | null;
  itemById: (id: string) => Item | undefined;
};

const StoreContext = createContext<Store | null>(null);

const NEXT_STATUS: Record<OrderStatus, OrderStatus> = {
  new: "making",
  making: "ready",
  ready: "picked-up",
  "picked-up": "picked-up",
};

export function StoreProvider({
  children,
  initialBusiness = "truck",
  initialView = "customer",
}: {
  children: React.ReactNode;
  /**
   * Which business and which screen the URL asked for. Resolved on the server
   * in page.tsx from `?biz=` and `?view=` so the prerendered HTML is already
   * the right business — the tab title, the link preview and the no-JS render
   * used to say "food truck" no matter which demo you opened.
   *
   * These seed state once. The in-demo toggle owns it from then on.
   */
  initialBusiness?: BusinessKey;
  initialView?: View;
}) {
  const [business, setBusinessState] = useState<BusinessKey>(initialBusiness);
  const [view, setView] = useState<View>(initialView);
  const [items, setItems] = useState<Record<BusinessKey, Item[]>>({
    truck: TRUCK_ITEMS,
    bakery: BAKERY_ITEMS,
  });
  const [orders, setOrders] = useState<Record<BusinessKey, Order[]>>(SEED_ORDERS);
  const [cart, setCart] = useState<Record<BusinessKey, CartLine[]>>({
    truck: [],
    bakery: [],
  });
  const [spot, setSpotState] = useState<Spot>(SPOTS[0]);
  const [subscribers, setSubscribers] = useState<Record<BusinessKey, number>>({
    truck: BUSINESSES.truck.subscribers,
    bakery: BUSINESSES.bakery.subscribers,
  });
  const [blasts, setBlasts] = useState<Blast[]>([]);
  const [myOrderId, setMyOrderId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [week, setWeek] = useState<WeekStop[]>(TRUCK_WEEK);
  /** Monday-indexed. Null until mounted so SSR and hydration match. */
  const [todayIndex, setTodayIndex] = useState<number | null>(null);
  /** Minutes since midnight, same mount-only rule as todayIndex. */
  const [nowMinutes, setNowMinutes] = useState<number | null>(null);

  // Counters live in refs so nothing time- or random-based runs during render.
  const orderSeq = useRef(106);
  const blastSeq = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  // Resolve "today" after mount only — reading the clock during render would
  // desync the prerendered HTML from the first client paint.
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTodayIndex((d.getDay() + 6) % 7);
      setNowMinutes(d.getHours() * 60 + d.getMinutes());
    };
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  // Whatever the owner sets live today wins over what was planned for today,
  // so the hero card and the week list can never contradict each other.
  useEffect(() => {
    if (todayIndex === null) return;
    setWeek((prev) =>
      prev.map((d, i) => (i === todayIndex ? { ...d, spotId: spot.id } : d)),
    );
  }, [todayIndex, spot.id]);

  const setDayStop = useCallback(
    (dayIndex: number, spotId: string | null) => {
      setWeek((prev) =>
        prev.map((d, i) => (i === dayIndex ? { ...d, spotId } : d)),
      );
    },
    [],
  );

  // Deep links (?biz=bakery&view=staff) used to be read here, after mount. That
  // meant every visitor got the food truck in the server HTML and a corrected
  // screen one frame later — wrong tab title, wrong link preview, wrong page
  // with JS off. They are read on the server now and arrive as props above.

  // Order age ticks on the client only.
  useEffect(() => {
    const t = setInterval(() => {
      setOrders((prev) => {
        const next: Record<BusinessKey, Order[]> = { truck: [], bakery: [] };
        (Object.keys(prev) as BusinessKey[]).forEach((k) => {
          next[k] = prev[k].map((o) =>
            o.status === "picked-up" ? o : { ...o, age: o.age + 1 },
          );
        });
        return next;
      });
    }, 60_000);
    return () => clearInterval(t);
  }, []);

  const setBusiness = useCallback((b: BusinessKey) => {
    setBusinessState(b);
    setMyOrderId(null);
  }, []);

  const patchItems = useCallback(
    (fn: (list: Item[]) => Item[]) => {
      setItems((prev) => ({ ...prev, [business]: fn(prev[business]) }));
    },
    [business],
  );

  const toggleSoldOut = useCallback(
    (itemId: string) => {
      patchItems((list) =>
        list.map((it) => {
          if (it.id !== itemId) return it;
          const soldOut = !it.soldOut;
          return {
            ...it,
            soldOut,
            countLeft: it.countLeft === null ? null : soldOut ? 0 : it.countLeft,
          };
        }),
      );
      // Pull it out of the cart too — you can't sell what just ran out.
      setCart((prev) => ({
        ...prev,
        [business]: prev[business].filter((l) => l.id !== itemId),
      }));
    },
    [patchItems, business],
  );

  const restock = useCallback(
    (itemId: string, amount: number) => {
      patchItems((list) =>
        list.map((it) => {
          if (it.id !== itemId || it.countLeft === null) return it;
          const countLeft = Math.max(0, it.countLeft + amount);
          return { ...it, countLeft, soldOut: countLeft === 0 };
        }),
      );
    },
    [patchItems],
  );

  const addWeeklyItem = useCallback(
    (candidateId: string) => {
      const c = WEEKLY_CANDIDATES.find((w) => w.id === candidateId);
      if (!c) return;
      setItems((prev) => {
        if (prev.bakery.some((i) => i.id === c.id)) return prev;
        const fresh: Item = { ...c, soldOut: false, countLeft: 24 };
        return { ...prev, bakery: [fresh, ...prev.bakery] };
      });
      showToast(`${c.name} is live on the website and in inventory.`);
    },
    [showToast],
  );

  const removeItem = useCallback(
    (itemId: string) => {
      patchItems((list) => list.filter((i) => i.id !== itemId));
      setCart((prev) => ({
        ...prev,
        [business]: prev[business].filter((l) => l.id !== itemId),
      }));
    },
    [patchItems, business],
  );

  const setSpot = useCallback(
    (next: Spot) => {
      setSpotState(next);
      showToast(`Location updated — the website changed instantly.`);
    },
    [showToast],
  );

  const sendBlast = useCallback(
    (body: string) => {
      blastSeq.current += 1;
      setBlasts((prev) => [
        { id: blastSeq.current, body, sent: subscribers[business] },
        ...prev,
      ]);
      showToast(`Sent to ${subscribers[business]} people.`);
    },
    [business, subscribers, showToast],
  );

  const addToCart = useCallback(
    (itemId: string) => {
      setCart((prev) => {
        const list = prev[business];
        const found = list.find((l) => l.id === itemId);
        const nextList = found
          ? list.map((l) => (l.id === itemId ? { ...l, qty: l.qty + 1 } : l))
          : [...list, { id: itemId, qty: 1 }];
        return { ...prev, [business]: nextList };
      });
    },
    [business],
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      setCart((prev) => {
        const list = prev[business];
        const found = list.find((l) => l.id === itemId);
        if (!found) return prev;
        const nextList =
          found.qty <= 1
            ? list.filter((l) => l.id !== itemId)
            : list.map((l) => (l.id === itemId ? { ...l, qty: l.qty - 1 } : l));
        return { ...prev, [business]: nextList };
      });
    },
    [business],
  );

  const clearCart = useCallback(() => {
    setCart((prev) => ({ ...prev, [business]: [] }));
  }, [business]);

  const currentItems = items[business];
  const currentCart = cart[business];

  const itemById = useCallback(
    (id: string) => currentItems.find((i) => i.id === id),
    [currentItems],
  );

  const cartTotal = useMemo(
    () =>
      currentCart.reduce((sum, line) => {
        const item = currentItems.find((i) => i.id === line.id);
        return sum + (item ? item.price * line.qty : 0);
      }, 0),
    [currentCart, currentItems],
  );

  const cartCount = useMemo(
    () => currentCart.reduce((n, l) => n + l.qty, 0),
    [currentCart],
  );

  const placeOrder = useCallback(
    (name: string, phone: string) => {
      if (currentCart.length === 0) return;
      orderSeq.current += 1;
      const prefix = business === "truck" ? "A" : "R";
      const id = `o-demo-${orderSeq.current}`;
      const lines = currentCart.map((l) => {
        const item = currentItems.find((i) => i.id === l.id);
        return {
          id: l.id,
          name: item?.name ?? "Item",
          qty: l.qty,
          price: item?.price ?? 0,
        };
      });
      const order: Order = {
        id,
        ref: `${prefix}-${orderSeq.current}`,
        name: name.trim() || "Guest",
        phone: phone.trim() || "(770) 555-0100",
        lines,
        total: lines.reduce((s, l) => s + l.price * l.qty, 0),
        status: "new",
        age: 0,
        isDemo: true,
      };
      setOrders((prev) => ({ ...prev, [business]: [order, ...prev[business]] }));
      setMyOrderId(id);
      clearCart();
      showToast("Order sent to the counter screen.");
    },
    [currentCart, currentItems, business, clearCart, showToast],
  );

  const advanceOrder = useCallback(
    (orderId: string) => {
      let becameReady = false;
      let who = "";
      setOrders((prev) => ({
        ...prev,
        [business]: prev[business].map((o) => {
          if (o.id !== orderId) return o;
          const status = NEXT_STATUS[o.status];
          if (status === "ready") {
            becameReady = true;
            who = o.name;
          }
          return { ...o, status };
        }),
      }));
      if (becameReady) showToast(`Text sent to ${who}: your order is ready.`);
    },
    [business, showToast],
  );

  const subscribe = useCallback(() => {
    setSubscribers((prev) => ({ ...prev, [business]: prev[business] + 1 }));
    showToast("You're on the list. That number is theirs to keep.");
  }, [business, showToast]);

  const myOrder = useMemo(
    () => orders[business].find((o) => o.id === myOrderId) ?? null,
    [orders, business, myOrderId],
  );

  const value: Store = {
    business,
    view,
    items,
    orders,
    cart,
    spot,
    subscribers,
    blasts,
    myOrderId,
    toast,
    week,
    todayIndex,
    nowMinutes,
    setBusiness,
    setView,
    setDayStop,
    toggleSoldOut,
    restock,
    addWeeklyItem,
    removeItem,
    setSpot,
    sendBlast,
    addToCart,
    removeFromCart,
    clearCart,
    placeOrder,
    advanceOrder,
    subscribe,
    showToast,
    currentItems,
    currentOrders: orders[business],
    currentCart,
    cartTotal,
    cartCount,
    myOrder,
    itemById,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
