import { create } from 'zustand/index'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ModalType {
  val: null | 'delete' | 'review' | 'edit'
}

interface ModalStore {
  type: ModalType['val']
  setType: (type: ModalType['val']) => void
}

export const useModalStore = create<ModalStore>()(
  persist(
    (set) => ({
      type: null,
      setType: (type: ModalType['val']) => set({ type })
    }),
    { name: 'modal', storage: createJSONStorage(() => sessionStorage) }
  )
)
