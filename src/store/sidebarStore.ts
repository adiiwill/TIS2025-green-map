import { create } from 'zustand/index'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SidebarStore {
  isExpanded: boolean
  toggle: () => void
  sidebarReset: () => void
}

interface State {
  isExpanded: boolean
}

const initialState: State = {
  isExpanded: true
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      ...initialState,
      isExpanded: true,
      toggle: () => set((state) => ({ isExpanded: !state.isExpanded })),
      sidebarReset: () => set(initialState)
    }),
    { name: 'sidebar', storage: createJSONStorage(() => sessionStorage) }
  )
)
