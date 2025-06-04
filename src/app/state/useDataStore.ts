import {create} from 'zustand'

const useUserData = create((set) => ({
        userData: {},
        setUserData: () => set((state) => ({userData: state})),
        unsetUserData: () => set(() => ({userData:{}}))
}))

export default useUserData;