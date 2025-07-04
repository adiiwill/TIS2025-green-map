import axios from 'axios'
import { create } from 'zustand/index'
import { createJSONStorage, persist } from 'zustand/middleware'

import { useAuthStore } from './authStore'

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
  filteredPois: POI[]

  updatePoi: (poi: POI) => void
  deletePoi: (id: number) => void
  getAllPoi: () => Promise<boolean>
  getPaginatedPoi: (page: number, size: number) => Promise<POIData>
  addPoi: (poi: POI) => void
  searchPoi: (query: string) => void

  poiReset: () => void
}

interface State {
  allPoi: POIData
  filteredPois: POI[]
}

const initialState: State = {
  allPoi: { pointOfInterests: [], numberOfItems: 0, numberOfPages: 0 },
  filteredPois: []
}

export const usePOIStore = create<POIStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      allPoi: { pointOfInterests: [], numberOfItems: 0, numberOfPages: 0 },
      filteredPois: [],
      updatePoi: async (poi: POI) => {
        const token = useAuthStore.getState().token
        try {
          const response = await axios.put(`/api/poi/${poi.id}`, poi, {
            headers: { Authorization: `Bearer ${token}` }
          })
          set(() => ({ allPoi: response.data }))
          await get().getAllPoi()
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
          await get().getAllPoi()
        } catch (error) {
          console.log(error)
        }
      },
      addPoi: async (poi: POI) => {
        const token = useAuthStore.getState().token
        try {
          await axios.post('/api/poi', poi, {
            headers: { Authorization: `Bearer ${token}` }
          })
          await get().getAllPoi()
        } catch (error) {
          console.log(error)
        }
      },
      getAllPoi: async () => {
        try {
          const initialRequest = await get().getPaginatedPoi(1, 10)
          const allPages = initialRequest.numberOfPages

          const _allPoi: POIData = {
            pointOfInterests: [...initialRequest.pointOfInterests],
            numberOfItems: initialRequest.numberOfItems,
            numberOfPages: initialRequest.numberOfPages
          }

          for (let i = 2; i <= allPages; i++) {
            const response = await get().getPaginatedPoi(i, 10)
            _allPoi.pointOfInterests.push(...response.pointOfInterests)
          }

          set(() => ({ allPoi: _allPoi, filteredPois: [] }))
          return false
        } catch (error) {
          console.log(error)
          return true
        }
      },
      getPaginatedPoi: async (page: number, size: number) => {
        try {
          const token = useAuthStore.getState().token
          const response = await axios.get(`/api/poi?page=${page}&size=${size}`, {
            headers: { Authorization: `Bearer ${token}` }
          })

          return response.data
        } catch (error) {
          console.log(error)
        }
      },
      searchPoi: (query: string): void => {
        if (!query || query.trim() === '') {
          set({ filteredPois: [] })
        }

        const searchTerm = query.toLowerCase().trim()
        const { pointOfInterests } = get().allPoi

        set({
          filteredPois: pointOfInterests.filter((poi) => {
            return (
              poi.name.toLowerCase().includes(searchTerm) ||
              poi.category.toLowerCase().includes(searchTerm) ||
              poi.subCategory.toLowerCase().includes(searchTerm) ||
              poi.description.toLowerCase().includes(searchTerm) ||
              poi.address.toLowerCase().includes(searchTerm) ||
              poi.email.toLowerCase().includes(searchTerm) ||
              poi.phoneNumber.toLowerCase().includes(searchTerm) ||
              poi.openingHours.toLowerCase().includes(searchTerm)
            )
          })
        })
      },

      poiReset: () => set(initialState)
    }),
    { name: 'poi', storage: createJSONStorage(() => sessionStorage) }
  )
)
