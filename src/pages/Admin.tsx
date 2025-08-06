import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import Pagination from '../components/admin/Pagination'
import PoiItemTile from '../components/admin/PoiItemTile'
import PoiSkeleton from '../components/admin/PoiSkeleton'
import Layout from '../components/layout/Layout'
import { POI, usePOIStore } from '../store/poiStore'

const Admin = () => {
  const { t } = useTranslation()
  const { filteredPois, getPaginatedPoi } = usePOIStore()

  const [allPois, setAllPois] = useState<POI[]>([])
  const [displayPois, setDisplayPois] = useState<POI[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const itemsPerPage = 9

  useEffect(() => {
    setPage(0)
  }, [filteredPois])

  useEffect(() => {
    if (filteredPois.length === 0) {
      const fetchPois = async () => {
        try {
          setLoading(true)
          const response = await getPaginatedPoi(page, itemsPerPage)

          if (response && 'numberOfPages' in response && 'pointOfInterests' in response) {
            setAllPois(response.pointOfInterests)
            setDisplayPois(response.pointOfInterests)
            setTotalPages(response.numberOfPages)
          } else {
            setError(true)
          }
        } catch (err) {
          setError(true)
        } finally {
          setLoading(false)
        }
      }

      fetchPois()
    }
  }, [getPaginatedPoi, page])

  useEffect(() => {
    if (filteredPois.length > 0) {
      setLoading(false)
      setAllPois(filteredPois)

      const totalFilteredPages = Math.ceil(filteredPois.length / itemsPerPage)
      setTotalPages(totalFilteredPages)

      const startIndex = page * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const currentPagePois = filteredPois.slice(startIndex, endIndex)
      setDisplayPois(currentPagePois)
    }
  }, [filteredPois, page, itemsPerPage])

  const hasDisplayPois = displayPois.length > 0

  if (loading) {
    return (
      <Layout title={t('admin.title')} extended>
        <div className="bg-[#f2f2f2] dark:bg-bgDark min-h-screen">
          <div className="grid grid-cols-[repeat(auto-fit,375px)] justify-center gap-6 overflow-auto p-4 lg:p-14 pt-[200px] pb-[100px]">
            {Array.from({ length: 9 }, (_, i) => (
              <PoiSkeleton key={i} />
            ))}
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !hasDisplayPois) {
    const isSearchActive = filteredPois.length >= 0 && allPois === filteredPois

    return (
      <Layout title={t('admin.title')} extended>
        <div className="bg-[#f2f2f2] dark:bg-bgDark min-h-screen pt-[100px] lg:pt-0 lg:min-h-[calc(100vh-170px)] flex flex-col items-center justify-center gap-6">
          <img
            src={
              isSearchActive
                ? '/undraw_location_search_re_ttoj.svg'
                : '/undraw_no_data_re_kwbl.svg'
            }
            alt={isSearchActive ? t('admin.noSearchResultsAlt') : t('admin.noDataAlt')}
            className="w-[300px]"
          />
          <h2 className="text-3xl font-bold font-merryweather">
            {isSearchActive ? t('admin.noSearchResults') : t('admin.noData')}
          </h2>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={t('admin.title')} extended>
      <div className="bg-[#f2f2f2] dark:bg-bgDark min-h-screen flex flex-col">
        <div className="grid grid-cols-[repeat(auto-fit,375px)] justify-center gap-6 overflow-auto overflow-x-hidden p-4 lg:p-14 pt-[200px] pb-6">
          {displayPois.map((poi) => (
            <PoiItemTile key={poi.id} item={poi} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center p-8 pb-32 pt-0">
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Admin
