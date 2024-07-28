import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {Book} from "@/models/book";

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  data: Book;
}

export type CartStoreState = {
  items: CartItem[]
  totalPrice: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  updateQuantity: (id: string, quantity: number) => void
  calculateTotal: () => void,
  addBookToCart: (book: Book) => void
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
      addBookToCart: (book: Book) => {
        const cartItem: CartItem = {
          id: book.olid,
          name: book.title,
          price: book.price,
          quantity: 1,
          data: book
        };

        set((state) => {
          const existingItem = state.items.find(i => i.id === cartItem.id);
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.id === cartItem.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            };
          } else {
            return {
              items: [...state.items, cartItem]
            };
          }
        });
        get().calculateTotal();
      },
    }),
    {
      name: 'cart-store',
    }
  )
)

export const useCartCount = () => useCartStore((state) => state.items.length)
