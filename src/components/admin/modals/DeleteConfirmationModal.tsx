import { FunctionComponent } from 'react'

import { useTranslation } from 'react-i18next'

import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { TrashIcon } from '@heroicons/react/24/solid'

import { usePOIStore } from '../../../store/poiStore'

interface DeleteConfirmationModalProps {
  id: number
  onClose: () => void
}

const DeleteConfirmationModal: FunctionComponent<DeleteConfirmationModalProps> = ({
  id,
  onClose
}) => {
  const { t } = useTranslation()
  const { deletePoi } = usePOIStore()

  const handleDelete = () => {
    deletePoi(id)
    onClose()
  }

  return (
    <ModalContent>
      <ModalHeader className="flex flex-col items-center">
        <div className="bg-red-200 p-2 rounded-full">
          <TrashIcon className="w-8 h-8 text-red-600" />
        </div>
      </ModalHeader>
      <ModalBody className="items-center font-merryweather">
        <p>{t('deleteModal.confirmation')}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="default"
          variant="bordered"
          radius="sm"
          onPress={onClose}
          autoFocus
          className="font-lato font-bold text-gray-600 text-md px-8"
        >
          {t('deleteModal.cancel')}
        </Button>
        <Button
          color="danger"
          variant="solid"
          radius="sm"
          onPress={handleDelete}
          className="font-lato font-bold text-md px-8"
        >
          {t('deleteModal.delete')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default DeleteConfirmationModal
