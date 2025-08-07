import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart as SChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { POI } from '../../store/poiStore'
import { usePOIStore } from '../../store/poiStore'

interface ScatterData {
  name: string
  x: number
  y: number
}

const scatterData = (data: POI[]): ScatterData[] => {
  return data.map((poi) => ({
    name: poi.name,
    x: poi.longitude,
    y: poi.latitude
  }))
}

const ScatterChart = () => {
  const { allPoi } = usePOIStore()

  const data = scatterData(allPoi.pointOfInterests)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <SChart>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name="Longitude"
          domain={[16, 23]}
          height={20}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Latitude"
          domain={[45.5, 49]}
          width={30}
          tick={{ fontSize: 12 }}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="POIs" data={data} fill="#10B981" shape="circle" />
      </SChart>
    </ResponsiveContainer>
  )
}

export default ScatterChart
