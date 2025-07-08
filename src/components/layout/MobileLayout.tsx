import { FunctionComponent, useState } from 'react'

import { Button, Input, Modal } from '@heroui/react'
import {
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PlusIcon,
  UserIcon
} from '@heroicons/react/24/outline'

import MobileLayoutLink from './MobileLayoutLink'
import { usePOIStore } from '../../store/poiStore'
import PoiFormModal from '../admin/modals/PoiFormModal.tsx'

interface MobileLayoutProps {
  extended?: boolean
}

const MobileLayout: FunctionComponent<MobileLayoutProps> = ({ extended }) => {
  const { searchPoi } = usePOIStore()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleAddNew = () => {
    setIsAddModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
  }

  return (
    <>
      {extended && (
        <div className="h-[180px] w-full fixed z-20 bg-white drop-shadow-md flex flex-col justify-center items-center p-6 gap-5">
          <Input
            placeholder="Search for..."
            className="text-2xl"
            variant="bordered"
            startContent={<MagnifyingGlassIcon className="w-8 h-8 text-gray-500" />}
            radius="sm"
            size="lg"
            onChange={(e) => searchPoi(e.target.value)}
          />
          <Button
            className="flex items-center gap-1 bg-mainGreen text-white text-2xl p-6 w-full"
            radius="sm"
            onPress={handleAddNew}
          >
            <PlusIcon className="w-6 h-6" /> Add New
          </Button>
        </div>
      )}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 px-3 w-[95%] max-w-[360px] h-[75px] font-bold font-merryweather bg-white drop-shadow-md rounded-sm flex items-center place-content-around gap-3">
        <MobileLayoutLink href="/" text={'Home'} icon={<HomeIcon className="w-6 h-6" />} />
        <MobileLayoutLink
          href="/administration"
          text={'Admin'}
          icon={<Cog6ToothIcon className="w-6 h-6" />}
        />
        <button
          className="flex items-center justify-center w-19 h-19 bg-mainGreen rounded-full border-2 border-white drop-shadow-md -translate-y-1/3 cursor-pointer"
          onClick={handleAddNew}
        >
          <PlusIcon className="w-12 h-12 text-white" />
        </button>
        <MobileLayoutLink href="/map" text={'Map'} icon={<MapPinIcon className="w-6 h-6" />} />
        <MobileLayoutLink
          href="/profile"
          text={'Profile'}
          icon={<UserIcon className="w-6 h-6" />}
        />
      </div>
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        backdrop="blur"
        placement="center"
        radius="sm"
        size="3xl"
      >
        <PoiFormModal onClose={handleCloseAddModal} />
      </Modal>
    </>
  )
}

export default MobileLayout
