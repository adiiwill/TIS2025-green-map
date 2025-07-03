import { FunctionComponent } from 'react'

import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { ScrollShadow } from '@heroui/react'

import { useModalStore } from '../../../store/modalStore'
import { POI } from '../../../store/poiStore'
import PoiReviewItem from '../PoiReviewItem'

interface PoiReviewModalProps {
  item: POI
  onClose: () => void
  onOpen: () => void
}

const PoiReviewModal: FunctionComponent<PoiReviewModalProps> = ({ item, onClose, onOpen }) => {
  const { setType } = useModalStore()

  const handleEdit = () => {
    setType('edit')
    onOpen()
  }

  return (
    <ModalContent>
      <ModalHeader className="text-3xl">{item.name}</ModalHeader>
      <ModalBody>
        <div className="hidden md:block text-xl">
          <div className="w-full flex flex-row">
            <PoiReviewItem title="Category" value={item.category} />
            <PoiReviewItem title="Subcategory" value={item.subCategory} />
          </div>
          <div className="w-full flex flex-row">
            <PoiReviewItem title="Description" value={item.description} />
            <PoiReviewItem title="URL">
              <a href={`https://${item.url}`} target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            </PoiReviewItem>
          </div>
          <div className="w-full flex flex-row">
            <PoiReviewItem title="E-mail" value={item.email}>
              <a href={`mailto:${item.email}`}>{item.email}</a>
            </PoiReviewItem>
            <PoiReviewItem title="Phone number" value={item.phoneNumber}>
              <a href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a>
            </PoiReviewItem>
          </div>
          <div className="w-full flex flex-row">
            <PoiReviewItem title="Address" value={item.address} />
            <PoiReviewItem title="Opening hours" value={item.openingHours} />
          </div>
          <div className="w-full flex flex-row">
            <PoiReviewItem title="Longitude" value={item.longitude} />
            <PoiReviewItem title="Latitude" value={item.latitude} />
          </div>
        </div>
        <ScrollShadow className="md:hidden text-xl overflow-y-scroll max-h-[400px]">
          <PoiReviewItem title="Category" value={item.category} />
          <PoiReviewItem title="Subcategory" value={item.subCategory} />
          <PoiReviewItem title="Description" value={item.description} />
          <PoiReviewItem title="URL">
            <a href={`https://${item.url}`} target="_blank" rel="noopener noreferrer">
              {item.url}
            </a>
          </PoiReviewItem>
          <PoiReviewItem title="E-mail" value={item.email} />
          <PoiReviewItem title="Phone number" value={item.phoneNumber}>
            <a href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a>
          </PoiReviewItem>
          <PoiReviewItem title="Address" value={item.address} />
          <PoiReviewItem title="Opening hours" value={item.openingHours} />
          <PoiReviewItem title="Longitude" value={item.longitude} />
          <PoiReviewItem title="Latitude" value={item.latitude} />
        </ScrollShadow>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="bordered"
          color="default"
          radius="sm"
          onPress={onClose}
          className="font-bold font-merryweather text-gray-600 text-md w-[220px]"
          autoFocus
        >
          Cancel
        </Button>
        <Button
          onPress={() => handleEdit()}
          radius="sm"
          className="bg-mainGreen text-white font-bold font-merryweather text-md w-[220px]"
        >
          Edit
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default PoiReviewModal
