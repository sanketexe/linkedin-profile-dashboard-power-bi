import { create } from 'zustand'

interface FilterState {
  selectedGender: string[]
  selectedOccupations: string[]
  selectedDisorders: string[]
  ageRange: [number, number]
  setGenderFilter: (genders: string[]) => void
  setOccupationFilter: (occupations: string[]) => void
  setDisorderFilter: (disorders: string[]) => void
  setAgeRange: (range: [number, number]) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedGender: [],
  selectedOccupations: [],
  selectedDisorders: [],
  ageRange: [27, 60],
  
  setGenderFilter: (genders) => set({ selectedGender: genders }),
  setOccupationFilter: (occupations) => set({ selectedOccupations: occupations }),
  setDisorderFilter: (disorders) => set({ selectedDisorders: disorders }),
  setAgeRange: (range) => set({ ageRange: range }),
  
  resetFilters: () => set({
    selectedGender: [],
    selectedOccupations: [],
    selectedDisorders: [],
    ageRange: [27, 60],
  }),
}))
