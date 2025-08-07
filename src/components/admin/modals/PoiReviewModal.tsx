import { FunctionComponent } from 'react'

import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
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
            <PoiReviewItem title={t('poiReviewModal.fields.category')} value={item.category} />
            <PoiReviewItem
              title={t('poiReviewModal.fields.subcategory')}
              value={item.subCategory}
            />
          </div>
          <div className="w-full flex flex-row">
            <PoiReviewItem
              title={t('poiReviewModal.fields.description')}
              value={item.description}
            />
            <PoiReviewItem title={t('poiReviewModal.fields.url')}>
              <a href={`https://${item.url}`} target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            </PoiReviewItem>
          </div>
          <div className="w-full flex flex-row">
            <PoiReviewItem title={t('poiReviewModal.fields.email')} value={item.email}>
              <a href={`mailto:${item.email}`}>{item.email}</a>
            </PoiReviewItem>
            <PoiReviewItem
              title={t('poiReviewModal.fields.phoneNumber')}
              value={item.phoneNumber}
            >
              <a href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a>
            </PoiReviewItem>
          </div>
          <div className="w-full flex flex-row">
            <PoiReviewItem title={t('poiReviewModal.fields.address')} value={item.address} />
            <PoiReviewItem
              title={t('poiReviewModal.fields.openingHours')}
              value={item.openingHours}
            />
          </div>
          <div className="w-full flex flex-row">
            <PoiReviewItem
              title={t('poiReviewModal.fields.longitude')}
              value={item.longitude}
            />
            <PoiReviewItem title={t('poiReviewModal.fields.latitude')} value={item.latitude} />
          </div>
        </div>
        <ScrollShadow className="md:hidden text-xl overflow-y-scroll max-h-[400px]">
          <PoiReviewItem title={t('poiReviewModal.fields.category')} value={item.category} />
          <PoiReviewItem
            title={t('poiReviewModal.fields.subcategory')}
            value={item.subCategory}
          />
          <PoiReviewItem
            title={t('poiReviewModal.fields.description')}
            value={item.description}
          />
          <PoiReviewItem title={t('poiReviewModal.fields.url')}>
            <a href={`https://${item.url}`} target="_blank" rel="noopener noreferrer">
              {item.url}
            </a>
          </PoiReviewItem>
          <PoiReviewItem title={t('poiReviewModal.fields.email')} value={item.email} />
          <PoiReviewItem
            title={t('poiReviewModal.fields.phoneNumber')}
            value={item.phoneNumber}
          >
            <a href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a>
          </PoiReviewItem>
          <PoiReviewItem title={t('poiReviewModal.fields.address')} value={item.address} />
          <PoiReviewItem
            title={t('poiReviewModal.fields.openingHours')}
            value={item.openingHours}
          />
          <PoiReviewItem title={t('poiReviewModal.fields.longitude')} value={item.longitude} />
          <PoiReviewItem title={t('poiReviewModal.fields.latitude')} value={item.latitude} />
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
          {t('poiReviewModal.buttons.cancel')}
        </Button>
        <Button
          onPress={() => handleEdit()}
          radius="sm"
          className="bg-mainGreen text-white font-bold font-merryweather text-md w-[220px]"
        >
          {t('poiReviewModal.buttons.edit')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default PoiReviewModal
