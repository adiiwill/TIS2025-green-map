import { FC } from 'react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { POI, usePOIStore } from '../../store/poiStore'

interface DataPoint {
  name: string
  amount: number
}

const groupData = (data: POI[]): DataPoint[] => {
  const categoryCount: Record<string, number> = {}

  data.forEach((poi) => {
    categoryCount[poi.category] = (categoryCount[poi.category] || 0) + 1
  })

  return Object.entries(categoryCount).map(([category, count]) => ({
    name: category,
    amount: count
  }))
}

const BarGraph: FC<BarGraphProps> = () => {
  const { allPoi } = usePOIStore()

  const grouped = groupData(allPoi.pointOfInterests)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={grouped}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickFormatter={(value) => (value.length > 16 ? value.slice(0, 16) + '…' : value)}
          height={20}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(value) => (Number.isInteger(value) ? value : '')}
          width={30}
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
        <Bar dataKey="amount" fill="#10B981" animationDuration={1200} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarGraph
