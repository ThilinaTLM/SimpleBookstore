import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartStoreState {
  items: CartItem[]
  totalPrice: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  updateQuantity: (id: string, quantity: number) => void
  calculateTotal: () => void
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(i => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              )
            };
          } else {
            return {
              items: [...state.items, item]
            };
          }
        });
        get().calculateTotal();
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
        get().calculateTotal();
      },
      clearCart: () => {
        set({ items: [] });
        get().calculateTotal();
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
        get().calculateTotal();
      },
      calculateTotal: () => {
        set((state) => ({
          totalPrice: state.items.reduce((total, item) => total + item.price * item.quantity, 0)
        }));
      },
    }),
    {
      name: 'cart-store',
    }
  )
)

