import { FC } from 'react'

import { cn } from '@heroui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface PageNumberProps {
  page: number
  setPage: (page: number) => void
  isActive?: boolean
}

const PageNumber: FC<PageNumberProps> = ({ page, setPage, isActive }) => {
  return (
    <button
      onClick={() => setPage(page)}
      className={cn(
        'px-2 py-0 font-merryweather font-bold cursor-pointer text-2xl rounded-sm transition-colors',
        isActive ? 'text-white bg-mainGreen' : 'text-mainGray hover:bg-gray-100'
      )}
    >
      {page + 1}
    </button>
  )
}

interface PaginationProps {
  page: number
  totalPages: number
  setPage: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null

  const renderPageNumbers = () => {
    const pages = []

    pages.push(<PageNumber key={0} page={0} setPage={setPage} isActive={0 === page} />)

    if (page > 2) {
      pages.push(
        <span key="ellipsis-start" className="px-0.5 font-merryweather text-2xl text-mainGray">
          ...
        </span>
      )
    }

    const start = Math.max(1, page - 1)
    const end = Math.min(totalPages - 2, page + 1)

    for (let i = start; i <= end; i++) {
      if (i !== 0 && i !== totalPages - 1) {
        pages.push(<PageNumber key={i} page={i} setPage={setPage} isActive={i === page} />)
      }
    }

    if (page < totalPages - 3) {
      pages.push(
        <span key="ellipsis-end" className="px-0.5 font-merryweather text-2xl text-mainGray">
          ...
        </span>
      )
    }

    if (totalPages > 1) {
      pages.push(
        <PageNumber
          key={totalPages - 1}
          page={totalPages - 1}
          setPage={setPage}
          isActive={totalPages - 1 === page}
        />
      )
    }

    return pages
  }

  return (
    <div className="inline-flex items-center text-mainGray gap-1">
      <ChevronLeftIcon
        className={cn(
          'w-8 cursor-pointer transition-opacity',
          page === 0 && 'opacity-30 pointer-events-none'
        )}
        onClick={() => page > 0 && setPage(page - 1)}
      />

      {renderPageNumbers()}

      <ChevronRightIcon
        className={cn(
          'w-8 cursor-pointer transition-opacity',
          page >= totalPages - 1 && 'opacity-30 pointer-events-none'
        )}
        onClick={() => page < totalPages - 1 && setPage(page + 1)}
      />
    </div>
  )
}

export default Pagination
