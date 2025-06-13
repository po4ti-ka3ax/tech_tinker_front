import { create } from 'zustand'
import { StatePowerInterface } from '../interfaces/interface'

export const usePowerStore = create<StatePowerInterface>((set, get) => ({
    power: {},
    totalPower: 0,

    setPowerStore: (component, powerValue) =>
    set((state) => {
        const updated = {
            ...state.power,
            [component]: Number(powerValue) 
        }
        const total = Object.values(updated).reduce((acc, val) => acc + val, 0)
        return {
            power: updated,
            totalPower: total
        }
    }),

    
    unsetPowerCurrentComponent: (componentName) =>
    set((state) => {
        const updated = { ...state.power }
        delete updated[componentName]
        const total = Object.values(updated).reduce((acc, val) => acc + val, 0)
        return {
            power: updated,
            totalPower: total
        }
    }),



    unsetPowerStore: () => set(() => ({
        power: {},
        totalPower: 0
    })),

    recalculateTotalPower: () => {
        const { power } = get();
        const total = Object.values(power).reduce((acc, val) => acc + val, 0)
        set({ totalPower: total })
    }
}))
