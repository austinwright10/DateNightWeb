import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const dayOfWeekStore = create(
  persist(
    (set) => ({
      day: '',
      setDay: (newDay: string) => set({ day: newDay }),
    }),
    { name: 'day', storage: createJSONStorage(() => localStorage) }
  )
)

export const priceStore = create(
  persist(
    (set) => ({
      price: 0,
      setPrice: (newPrice: number) => set({ price: newPrice }),
    }),
    {
      name: 'price',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const travelStore = create(
  persist(
    (set) => ({
      travel: 0,
      setTravel: (newTravel: number) => set({ travel: newTravel }),
    }),
    { name: 'travel', storage: createJSONStorage(() => localStorage) }
  )
)

export const interestStore = create((set) => ({
  interests: [],
  setInterests: (newInterest: any) =>
    set((state: any) => {
      const updatedInterests = state.interests.includes(newInterest)
        ? state.interests.filter((interest: any) => interest !== newInterest)
        : [...state.interests, newInterest]
      return { interests: updatedInterests }
    }),
}))

interface DateStore {
  previousDates: Array<{ id: string; title: string }>
  addDate: (date: { id: string; title: string }) => void
  loadDates: () => Promise<void>
}

export const useDateStore = create<DateStore>((set) => ({
  previousDates: [
    { id: '1', title: 'hello' },
    { id: '2', title: '2' },
  ],
  addDate: async (date) => {
    set((state) => {
      const updatedDates = [...state.previousDates, date]
      localStorage.setItem('previousDates', JSON.stringify(updatedDates))
      return { previousDates: updatedDates }
    })
  },
  loadDates: async () => {
    const storedDates = await localStorage.getItem('previousDates')
    if (storedDates) {
      set({ previousDates: JSON.parse(storedDates) })
    }
  },
}))

export const userIDStore = create((set) => ({
  id: null,
  setID: (new_id: string) => set({ id: new_id }),
}))
