import { FunctionComponent } from 'react'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure
} from '@heroui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'

import ModalHandler from './modals/ModalHandler'
import { useModalStore } from '../../store/modalStore'
import { POI } from '../../store/poiStore'

interface PoiItemTileProps {
  item: POI
}

const PoiItemTile: FunctionComponent<PoiItemTileProps> = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setType } = useModalStore()

  return (
    <div className="w-full max-w-[375px] min-w-[300px] h-[325px] bg-white rounded-md p-4 drop-shadow-md relative">
      <div className="flex items-center justify-between bg-[#f2f2f2] p-3 rounded-md">
        <span className="font-merryweather text-2xl">{item.name}</span>
        <Dropdown className="font-lato" placement="bottom-start" offset={5}>
          <DropdownTrigger>
            <Button variant="light" className="min-w-0 w-8 h-8 p-0">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="POI Actions" className="min-w-[120px]">
            <DropdownItem
              key="poi-edit-btn"
              startContent={<PencilSquareIcon className="w-5 h-5" />}
              onPress={() => {
                setType('edit')
                onOpen()
              }}
            >
              Edit
            </DropdownItem>
            <DropdownItem
              key="poi-delete-btn"
              startContent={<TrashIcon className="w-5 h-5" />}
              className="text-danger"
              color="danger"
              onPress={() => {
                setType('delete')
                onOpen()
              }}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex items-center justify-between font-lato text-xl p-3 border-dashed border-[#d9d9d9] border-b-1 px-0 mt-2">
        <span className="text-[#70757a]">Category</span>
        <span>{item.category}</span>
      </div>
      <div className="flex items-center justify-between font-lato text-xl p-3 border-dashed border-[#d9d9d9] border-b-1 px-0">
        <span className="text-[#70757a]">Longitude</span>
        <span>{item.longitude}</span>
      </div>
      <div className="flex items-center justify-between font-lato text-xl p-3 border-dashed border-[#d9d9d9] border-b-1 px-0">
        <span className="text-[#70757a]">Latitude</span>
        <span>{item.latitude}</span>
      </div>
      <Button
        variant="bordered"
        radius="sm"
        className="w-full mt-5 font-merryweather text-2xl border-black border-1 p-6"
        onPress={() => {
          setType('review')
          onOpen()
        }}
      >
        View
      </Button>
      <ModalHandler isOpen={isOpen} onOpen={onOpen} onClose={onClose} item={item} />
    </div>
  )
}

export default PoiItemTile
