import { useCallback, useEffect, useState } from 'react'

import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map as GoogleMap
} from '@vis.gl/react-google-maps'

import Layout from '../components/layout/Layout'
import CustomInfoView from '../components/map/CustomInfoView'
import { POI, usePOIStore } from '../store/poiStore'

const Map = () => {
  const center = { lat: 47.49791, lng: 19.0402 }

  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null)
  const [infoWindowShown, setInfoWindowShown] = useState<boolean>(false)

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
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
        <GoogleMap
          fullscreenControl={false}
          disableDefaultUI
          defaultCenter={center}
          defaultZoom={12}
          mapId="GREENMAP_MAP"
          className="h-screen w-screen"
        >
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
            >
              <CustomInfoView selectedPoi={selectedPoi} />
            </InfoWindow>
          )}
        </GoogleMap>
      </APIProvider>
    </Layout>
  )
}

export default Map
