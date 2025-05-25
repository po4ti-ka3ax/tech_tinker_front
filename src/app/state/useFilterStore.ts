import {create} from 'zustand'
import { FilterState } from '../interfaces/interface'

export const useFilterStore = create<FilterState>((set) => ({
    selectedFilters: {},
    toggleFilter: (category, id) => 
        set((state) => {
            const categoryValues = state.selectedFilters[category] || [];
            const exists = categoryValues.includes(id);

            return {
                selectedFilters: {
                    ...state.selectedFilters,
                    [category]: exists
                    ? categoryValues.filter((item) => item !== id)
                    : [...categoryValues, id]
                },
            };
        }),
        clearAllFilters: () => set({selectedFilters: {}})
}));