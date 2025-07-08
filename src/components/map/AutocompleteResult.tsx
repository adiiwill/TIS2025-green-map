import { FunctionComponent, useEffect } from 'react'

import { AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps'

interface AutocompleteResultProps {
  place: google.maps.places.Place | null
}

const AutocompleteResult: FunctionComponent<AutocompleteResultProps> = ({ place }) => {
  const map = useMap()

  // adjust the viewport of the map when the place is changed
  useEffect(() => {
    if (!map || !place) return
    if (place.viewport) map.fitBounds(place.viewport)
  }, [map, place])

  if (!place) return null

  // add a marker for the selected place
  return (
    <AdvancedMarker position={place.location}>
      <Pin
        background={place.iconBackgroundColor}
        glyph={place.svgIconMaskURI ? new URL(place.svgIconMaskURI) : null}
      />
    </AdvancedMarker>
  )
}

export default AutocompleteResult
