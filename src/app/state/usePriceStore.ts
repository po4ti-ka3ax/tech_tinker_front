import { create } from 'zustand'
import { StatePriceInterface } from '../interfaces/interface'

export const usePriceStore = create<StatePriceInterface>((set, get) => ({
    price: {},
    totalPrice: 0,

    setPriceStore: (component, priceValue) =>
    set((state) => {
        const updated = {
            ...state.price,
            [component]: Number(priceValue) 
        }
        const total = Object.values(updated).reduce((acc, val) => acc + val, 0)
        return {
            price: updated,
            totalPrice: total
        }
    }),

    
    unsetCurrentComponent: (componentName) =>
    set((state) => {
        const updated = { ...state.price }
        delete updated[componentName]
        const total = Object.values(updated).reduce((acc, val) => acc + val, 0)
        return {
            price: updated,
            totalPrice: total
        }
    }),



    unsetPriceStore: () => set(() => ({
        price: {},
        totalPrice: 0
    })),

    recalculateTotal: () => {
        const { price } = get();
        const total = Object.values(price).reduce((acc, val) => acc + val, 0)
        set({ totalPrice: total })
    }
}))
