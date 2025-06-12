import { create } from 'zustand/index'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SidebarStore {
  isExpanded: boolean
  toggle: () => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isExpanded: false,
      toggle: () => set((state) => ({ isExpanded: !state.isExpanded }))
    }),
    { name: 'sidebar', storage: createJSONStorage(() => sessionStorage) }
  )
)
