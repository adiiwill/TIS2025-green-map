import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import BarGraph from '../components/dashboard/BarGraph.tsx'
import Calendar from '../components/dashboard/Calendar.tsx'
import CountUp from '../components/dashboard/CountUp'
import ScatterChart from '../components/dashboard/ScatterChart.tsx'
import Layout from '../components/layout/Layout'
import { usePOIStore } from '../store/poiStore'

const Dashboard = () => {
  const { t } = useTranslation()
  const { getAllPoi, allPoi } = usePOIStore()

  useEffect(() => {
    getAllPoi()
  }, [getAllPoi, allPoi?.pointOfInterests?.length])

  return (
    <Layout title={t('dashboard.title')}>
      <div className="bg-[#f2f2f2] dark:bg-bgDark min-h-[calc(100vh-90px)] relative flex flex-col items-center pb-28 xl:pb-0">
        <div className="flex justify-between p-8 h-[800px] xl:h-[380px] xl:flex-row flex-col gap-6 w-full">
          <div className="p-12 pt-15 xl:bg-white xl:dark:bg-fgDark bg-mainGreen drop-shadow-md font-merryweather rounded-sm flex justify-center">
            <h2 className="self-start absolute top-4 left-4 text-3xl font-bold text-white dark:text-white xl:text-mainGray">
              {t('dashboard.pois')}
            </h2>
            <div className="xl:bg-mainGreen rounded-full p-3 inline-flex items-center justify-center drop-shadow-md">
              <div className="xl:bg-mainGreen rounded-full p-5 w-46 h-46 flex items-center justify-center xl:text-8xl text-9xl text-white xl:border-2 border-white">
                <CountUp from={0} to={allPoi.pointOfInterests.length} duration={1} />
              </div>
            </div>
          </div>
          <div className="p-2 xl:p-4 xl:pb-2 xl:pt-6 bg-white dark:bg-fgDark drop-shadow-md font-merryweather rounded-sm overflow-x-scroll w-full h-full">
            <BarGraph />
          </div>
        </div>

        <div className="flex justify-between p-8 pt-0 h-[800px] xl:h-[380px] xl:flex-row flex-col gap-6 w-full">
          <div className="p-4 pb-2 pt-6 bg-white dark:bg-fgDark drop-shadow-md font-merryweather rounded-sm overflow-x-scroll w-full h-full">
            <ScatterChart />
          </div>
          <div className="flex bg-white dark:bg-fgDark drop-shadow-md font-merryweather rounded-sm p-4 py-8 xl:py-0 xl:p-8">
            <Calendar />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
