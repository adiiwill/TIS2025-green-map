import { FunctionComponent } from 'react'

import { useTranslation } from 'react-i18next'

import { EnvelopeIcon, GlobeAltIcon, PhoneIcon } from '@heroicons/react/20/solid'

import { POI } from '../../store/poiStore'

interface CustomInfoViewProps {
  selectedPoi: POI
}

const CustomInfoView: FunctionComponent<CustomInfoViewProps> = ({ selectedPoi }) => {
  const { t } = useTranslation()

  return (
    <div className="w-full max-w-[350px] p-1 pt-0">
      <div className="font-lato text-sm text-gray-400 self-center flex flex-row gap-2">
        <p className="font-bold capitalize">{selectedPoi.category}</p>
        <span>{'>'}</span>
        <p className="capitalize">{selectedPoi.subCategory}</p>
      </div>

      <p className="font-lato text-base italic">{selectedPoi.address}</p>

      <div className="flex flex-col mt-2 font-lato text-base">
        <span className="text-sm text-white bg-gray-400 font-bold p-1">
          {t('customInfoView.description')}
        </span>
        <p className="bg-gray-100 p-1">{selectedPoi.description}</p>
      </div>

      <div className="flex flex-col mt-2 font-lato text-base">
        <span className="text-sm text-white bg-gray-400 font-bold p-1">
          {t('customInfoView.openingHours')}
        </span>
        <p className="bg-gray-100 p-1">{selectedPoi.openingHours}</p>
      </div>

      <div className="flex flex-col mt-2 font-lato text-base">
        <span className="text-sm text-white bg-gray-400 font-bold p-1">
          {t('customInfoView.contact')}
        </span>
        <div className="bg-gray-100 p-1 flex flex-col underline">
          <a
            href={`https://${selectedPoi.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-x-1.5 items-center"
          >
            <GlobeAltIcon className="w-3" />
            {selectedPoi.url}
          </a>
          <a
            href={`mailto:${selectedPoi.email}`}
            className="flex flex-row gap-x-1.5 items-center"
          >
            <EnvelopeIcon className="w-3" />
            {selectedPoi.email}
          </a>
          <a
            href={`tel:${selectedPoi.phoneNumber}`}
            className="flex flex-row gap-x-1.5 items-center"
          >
            <PhoneIcon className="w-3" />
            {selectedPoi.phoneNumber}
          </a>
        </div>
      </div>
    </div>
  )
}

export default CustomInfoView
