import axios from 'axios'
import { create } from 'zustand/index'
import { createJSONStorage, persist } from 'zustand/middleware'

import { useAuthStore } from './authStore.ts'

export interface POI {
  id: number
  name: string
  category: string
  subCategory: string
  description: string
  email: string
  phoneNumber: string
  address: string
  longitude: number
  latitude: number
  openingHours: string
  url: string
}

interface POIData {
  pointOfInterests: POI[]
  numberOfItems: number
  numberOfPages: number
}

interface POIStore {
  allPoi: POIData

  updatePoi: (poi: POI) => void
  deletePoi: (id: number) => void
  getAllPoi: () => Promise<boolean>
  addPoi: (poi: POI) => void

  poiReset: () => void
}

interface State {
  allPoi: POIData
}

const initialState: State = {
  allPoi: { pointOfInterests: [], numberOfItems: 0, numberOfPages: 0 }
}

export const usePOIStore = create<POIStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      allPoi: { pointOfInterests: [], numberOfItems: 0, numberOfPages: 0 },
      updatePoi: async (poi: POI) => {
        try {
          const response = await axios.put(`/api/poi/${poi.id}`, poi)
          set(() => ({ allPoi: response.data }))
        } catch (error) {
          console.log(error)
        }
      },
      deletePoi: async (id: number) => {
        try {
          const token = useAuthStore.getState().token
          await axios.delete(`/api/poi/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          get().getAllPoi()
        } catch (error) {
          console.log(error)
        }
      },
      addPoi: async (poi: POI) => {
        try {
          await axios.post('/api/poi', poi)
          await get().getAllPoi()
        } catch (error) {
          console.log(error)
        }
      },
      getAllPoi: async () => {
        try {
          const token = useAuthStore.getState().token
          const response = await axios.get('/api/poi', {
            headers: { Authorization: `Bearer ${token}` }
          })
          set(() => ({ allPoi: response.data }))
          return false // Success
        } catch (error) {
          console.log(error)
          return true // Error
        }
      },

      poiReset: () => set(initialState)
    }),
    { name: 'poi', storage: createJSONStorage(() => sessionStorage) }
  )
)
