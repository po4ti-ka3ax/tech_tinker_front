import {create} from 'zustand'

const useUserData = create((set) => ({
        userData: {},
        setUserData: (data) => set(() => ({userData: data})),
        unsetUserData: () => set(() => ({userData:{}}))
}))

export default useUserData;