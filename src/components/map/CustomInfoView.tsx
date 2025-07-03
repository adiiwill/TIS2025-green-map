import { FunctionComponent } from 'react'

import { POI } from '../../store/poiStore'

interface CustomInfoViewProps {
  selectedPoi: POI
}

const CustomInfoView: FunctionComponent<CustomInfoViewProps> = ({ selectedPoi }) => {
  return (
    <div className="w-full max-w-[350px] p-1">
      <p className="font-bold font-merryweather text-2xl text-mainGreen">{selectedPoi.name}</p>
      <div className="font-lato text-sm text-gray-400 self-center flex flex-row gap-2">
        <p className="font-bold capitalize">{selectedPoi.category}</p>
        <span>{'>'}</span>
        <p className="capitalize">{selectedPoi.subCategory}</p>
      </div>

      <p className="font-lato text-base">{selectedPoi.address}</p>

      <div className="flex flex-col mt-2 font-lato text-base">
        <span className="text-sm text-white bg-gray-400 font-bold p-0.5">Description</span>
        <p className="bg-gray-100 p-1">{selectedPoi.description}</p>
      </div>

      <div className="flex flex-col mt-2 font-lato text-base">
        <span className="text-sm text-white bg-gray-400 font-bold p-0.5">Opening hours</span>
        <p className="bg-gray-100 p-1">{selectedPoi.openingHours}</p>
      </div>

      <div className="flex flex-col mt-2 font-lato text-base">
        <span className="text-sm text-white bg-gray-400 font-bold p-0.5">Contact</span>
        <div className="bg-gray-100 p-1 flex flex-col underline">
          <a href={selectedPoi.url} target="_blank" rel="noopener noreferrer">
            {selectedPoi.url}
          </a>
          <a href={`mailto:${selectedPoi.email}`}>{selectedPoi.email}</a>
          <a href={`tel:${selectedPoi.phoneNumber}`}>{selectedPoi.phoneNumber}</a>
        </div>
      </div>
    </div>
  )
}

export default CustomInfoView
