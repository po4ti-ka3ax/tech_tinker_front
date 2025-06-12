import {create} from 'zustand'
import { StateConfigureInterface } from '../interfaces/interface'

export const useConfigureStore = create<StateConfigureInterface>((set) => ({
    configureStore: [],
    setConfigureStore: (componentName, component) => set((state) => ({configureStore: {
         ...state.configureStore,
        [componentName]: component
    }
       
     })),
    deleteConfigureObject: (key) => set((state) => {
        const updatedStore = {...state.configureStore}
        delete updatedStore[key]
        return {configureStore:updatedStore}
    }),
    unsetConfigureStore: () => set(() => ({configureStore:{}}))
}))
