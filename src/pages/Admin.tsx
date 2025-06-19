import { useEffect, useState } from 'react'

import PoiItemTile from '../components/admin/PoiItemTile.tsx'
import PoiSkeleton from '../components/admin/PoiSkeleton'
import Layout from '../components/layout/Layout'
import { usePOIStore } from '../store/poiStore.ts'

const Admin = () => {
  const { allPoi, getAllPoi } = usePOIStore()
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

  const hasNoPois = error || !allPoi?.pointOfInterests || allPoi.pointOfInterests.length === 0

  if (hasNoPois) {
    return (
      <Layout title="Administration" extended>
        <div className="bg-[#f2f2f2] min-h-screen pt-[100px] md:pt-0 md:min-h-[calc(100vh-180px)] flex flex-col items-center justify-center gap-6">
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

  return (
    <Layout title="Administration" extended>
      <div className="bg-[#f2f2f2] min-h-screen">
        <div className="grid grid-cols-[repeat(auto-fit,375px)] justify-center gap-6 overflow-auto p-4 lg:p-14 pt-[200px] pb-[100px]">
          {allPoi.pointOfInterests.map((poi) => (
            <PoiItemTile key={poi.id} item={poi} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Admin
