import { useEffect, useState } from 'react'

import PoiItemTile from '../components/admin/PoiItemTile'
import PoiSkeleton from '../components/admin/PoiSkeleton'
import Layout from '../components/layout/Layout'
import { usePOIStore } from '../store/poiStore'

const Admin = () => {
  const { filteredPois, allPoi, getAllPoi } = usePOIStore()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPois = async () => {
      setLoading(true)
      const err = await getAllPoi()
      if (err) setError(true)
      setLoading(false)
    }

    fetchPois()
  }, [getAllPoi])

  const isSearchActive = filteredPois.length > 0
  const hasAllPois = allPoi?.pointOfInterests?.length > 0
  const displayPois = isSearchActive ? filteredPois : (allPoi?.pointOfInterests ?? [])

  if (loading) {
    return (
      <Layout title="Administration" extended>
        <div className="bg-[#f2f2f2] min-h-screen">
          <div className="grid grid-cols-[repeat(auto-fit,375px)] justify-center gap-6 overflow-auto p-4 lg:p-14 pt-[200px] pb-[100px]">
            {Array.from({ length: 9 }, (_, i) => (
              <PoiSkeleton key={i} />
            ))}
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !hasAllPois) {
    return (
      <Layout title="Administration" extended>
        <div className="bg-[#f2f2f2] min-h-screen pt-[100px] lg:pt-0 lg:min-h-[calc(100vh-180px)] flex flex-col items-center justify-center gap-6">
          <img
            src="/undraw_no_data_re_kwbl.svg"
            alt="No data available"
            className="w-[300px]"
          />
          <h2 className="text-3xl font-bold font-merryweather">No data available</h2>
        </div>
      </Layout>
    )
  }

  if (isSearchActive && filteredPois.length === 0) {
    return (
      <Layout title="Administration" extended>
        <div className="bg-[#f2f2f2] min-h-screen pt-[100px] lg:pt-0 lg:min-h-[calc(100vh-180px)] flex flex-col items-center justify-center gap-6">
          <img
            src="/undraw_location_search_re_ttoj.svg"
            alt="No search results"
            className="w-[300px]"
          />
          <h2 className="text-3xl font-bold font-merryweather">No results found</h2>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Administration" extended>
      <div className="bg-[#f2f2f2] min-h-screen">
        <div className="grid grid-cols-[repeat(auto-fit,375px)] justify-center gap-6 overflow-auto p-4 lg:p-14 pt-[200px] pb-[100px]">
          {displayPois.map((poi) => (
            <PoiItemTile key={poi.id} item={poi} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Admin
