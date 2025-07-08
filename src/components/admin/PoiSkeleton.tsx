import { Skeleton } from '@heroui/react'

const PoiSkeleton = () => {
  return (
    <div className="w-full max-w-[375px] min-w-[300px] h-[325px] bg-white rounded-md p-4 drop-shadow-md relative">
      <div className="flex items-center justify-between bg-[#f2f2f2] p-3 rounded-md">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>

      <div className="flex items-center justify-between font-lato text-xl p-3 border-dashed border-[#d9d9d9] border-b-1 px-0 mt-2">
        <Skeleton className="h-6 w-20 rounded-lg" />
        <Skeleton className="h-6 w-24 rounded-lg" />
      </div>

      <div className="flex items-center justify-between font-lato text-xl p-3 border-dashed border-[#d9d9d9] border-b-1 px-0">
        <Skeleton className="h-6 w-20 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-lg" />
      </div>

      <div className="flex items-center justify-between font-lato text-xl p-3 border-dashed border-[#d9d9d9] border-b-1 px-0">
        <Skeleton className="h-6 w-16 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-lg" />
      </div>

      <div className="mt-5">
        <Skeleton className="w-full h-14 rounded-sm" />
      </div>
    </div>
  )
}

export default PoiSkeleton
