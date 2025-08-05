import { useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import {
  AdvancedMarker,
  ControlPosition,
  InfoWindow,
  Map as GoogleMap
} from '@vis.gl/react-google-maps'
import styled from 'styled-components'

import Layout from '../components/layout/Layout'
import Autocomplete from '../components/map/Autocomplete'
import AutocompleteResult from '../components/map/AutocompleteResult'
import CustomInfoView from '../components/map/CustomInfoView'
import { POI, usePOIStore } from '../store/poiStore'
import { useSettingStore } from '../store/settingStore'

const StyledGoogleMap = styled(GoogleMap)<{ $theme: 'dark' | 'light' }>`
  .gm-style,
  .gm-style-iw-c {
    background: ${(props) => (props.$theme === 'dark' ? '#171717' : '#fff')} !important;
  }

  .gm-style-iw-tc::after {
    background: ${(props) => (props.$theme === 'dark' ? '#171717' : '#fff')} !important;
  }
`

const Map = () => {
  const { t } = useTranslation()
  const center = { lat: 47, lng: 20 }
  const theme = useSettingStore().theme

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
    <Layout title={t('map.title')}>
      <StyledGoogleMap
        $theme={theme}
        fullscreenControl={false}
        disableDefaultUI
        defaultCenter={center}
        defaultZoom={7}
        gestureHandling="greedy"
        mapId="GREENMAP_MAP"
        className="h-screen xl:h-[calc(100vh-80px)] w-full"
        colorScheme={useSettingStore().theme === 'dark' ? 'DARK' : 'LIGHT'}
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
            className="dark:bg-bgDark dark:text-white"
            headerContent={
              <p className="font-bold font-merryweather text-2xl p-1 pb-0 text-mainGreen">
                {selectedPoi.name}
              </p>
            }
          >
            <CustomInfoView selectedPoi={selectedPoi} />
          </InfoWindow>
        )}
      </StyledGoogleMap>
    </Layout>
  )
}

export default Map
