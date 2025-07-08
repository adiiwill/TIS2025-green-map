import { useCallback, useEffect, useState } from 'react'

import {
  AdvancedMarker,
  ControlPosition,
  InfoWindow,
  Map as GoogleMap
} from '@vis.gl/react-google-maps'

import Layout from '../components/layout/Layout'
import Autocomplete from '../components/map/Autocomplete'
import AutocompleteResult from '../components/map/AutocompleteResult'
import CustomInfoView from '../components/map/CustomInfoView'
import { POI, usePOIStore } from '../store/poiStore'

const Map = () => {
  const center = { lat: 47, lng: 20 }

  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null)
  const [infoWindowShown, setInfoWindowShown] = useState<boolean>(false)
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.Place | null>(null)

  const handleMarkerClick = useCallback((poi: POI) => {
    setSelectedPoi(poi)
    setInfoWindowShown(true)
  }, [])

  const handleMarkerClose = useCallback(() => {
    setInfoWindowShown(false)
    setSelectedPoi(null)
  }, [])

  const { getAllPoi, allPoi } = usePOIStore()

  useEffect(() => {
    getAllPoi()
  }, [getAllPoi])

  return (
    <Layout title="Map">
      <GoogleMap
        fullscreenControl={false}
        disableDefaultUI
        defaultCenter={center}
        defaultZoom={7}
        gestureHandling="greedy"
        mapId="GREENMAP_MAP"
        className="h-screen w-screen"
      >
        <Autocomplete
          controlPosition={ControlPosition.TOP_LEFT}
          onPlaceSelect={setSelectedPlace}
        />
        <AutocompleteResult place={selectedPlace} />

        {allPoi?.pointOfInterests?.map((poi) => (
          <AdvancedMarker
            key={poi.id}
            position={{ lat: poi.latitude, lng: poi.longitude }}
            onClick={() => handleMarkerClick(poi)}
          />
        ))}

        {infoWindowShown && selectedPoi && (
          <InfoWindow
            key={selectedPoi.id}
            position={{ lat: selectedPoi.latitude, lng: selectedPoi.longitude }}
            onClose={handleMarkerClose}
            disableAutoPan
            headerContent={
              <p className="font-bold font-merryweather text-2xl p-1 pb-0 text-mainGreen">
                {selectedPoi.name}
              </p>
            }
          >
            <CustomInfoView selectedPoi={selectedPoi} />
          </InfoWindow>
        )}
      </GoogleMap>
    </Layout>
  )
}

export default Map
