import { FunctionComponent } from 'react'

import { Modal } from '@heroui/react'

import DeleteConfirmationModal from './DeleteConfirmationModal'
import PoiFormModal from './PoiFormModal'
import PoiReviewModal from './PoiReviewModal'
import { useModalStore } from '../../../store/modalStore'
import { POI } from '../../../store/poiStore'

interface ModalHandlerProps {
  item: POI
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

const modalConfigs = {
  delete: {
    size: 'md',
    className: 'gap-2',
    content: (item: POI, onClose: () => void) => (
      <DeleteConfirmationModal id={item.id} onClose={onClose} />
    )
  },
  review: {
    size: '3xl',
    className: '',
    content: (item: POI, onClose: () => void, onOpen: () => void) => (
      <PoiReviewModal item={item} onClose={onClose} onOpen={onOpen} />
    )
  },
  edit: {
    size: '2xl',
    className: '',
    content: (item: POI, onClose: () => void) => <PoiFormModal onClose={onClose} item={item} />
  }
} as const

const ModalHandler: FunctionComponent<ModalHandlerProps> = ({
  item,
  isOpen,
  onClose,
  onOpen
}) => {
  const { type } = useModalStore()

  const config = modalConfigs[type as keyof typeof modalConfigs]

  if (!config) return null // fallback

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="center"
      radius="sm"
      size={config.size}
      className={config.className}
    >
      {config.content(item, onClose, onOpen)}
    </Modal>
  )
}

export default ModalHandler
