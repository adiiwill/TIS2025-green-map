import { ControlPosition, MapControl } from '@vis.gl/react-google-maps'

import { AutocompleteCustom } from './AutocompleteCustom'

export interface AutocompleteMode {
  id: string
  label: string
}

interface AutocompleteProps {
  controlPosition: ControlPosition
  onPlaceSelect: (place: google.maps.places.Place | null) => void
}

const Autocomplete = ({ controlPosition, onPlaceSelect }: AutocompleteProps) => {
  return (
    <MapControl position={controlPosition}>
      <AutocompleteCustom onPlaceSelect={onPlaceSelect} />
    </MapControl>
  )
}

export default Autocomplete
