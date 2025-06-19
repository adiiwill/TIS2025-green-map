import { FunctionComponent, ReactNode } from 'react'

interface PoiReviewItemProps {
  title: string
  value?: number | string
  children?: ReactNode
}

const PoiReviewItem: FunctionComponent<PoiReviewItemProps> = ({ title, value, children }) => {
  return (
    <div className="flex flex-col w-full border-[#70757a] border-b-1 p-3 mb-1 font-merryweather font-bold">
      <span className="text-[#70757a]">{title}</span>
      {children ? <div className="text-mainGreen underline">{children}</div> : value}
    </div>
  )
}

export default PoiReviewItem
