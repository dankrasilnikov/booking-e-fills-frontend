import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { IMapObject } from '@/types/api.ts'
import { useEffect } from 'react'

interface MapContainerProps {
  stations: IMapObject[]
  userLocation: { lat: number; lng: number } | null
  onStationSelect: (stationId: number) => void
  isLoading: boolean
}

// Custom icons
const activeIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const inactiveIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const userIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Component to handle map resizing
const MapResizer = () => {
  const map = useMap()
  map.invalidateSize()
  return null
}

// Component to handle map markers
const MapMarkers = ({
  stations,
  userLocation,
  onStationSelect,
  isLoading,
}: MapContainerProps) => {
  return (
    <>
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          icon={station.active ? activeIcon : inactiveIcon}
          eventHandlers={{
            click: (event) => {
              event.target.closePopup()
              onStationSelect(station.id)
            },
            mouseover: (event) => {
              console.log(event.target)
              event.target.openPopup()
            },
            mouseout: (event) => {
              event.target.closePopup()
            },
          }}
        >
          <Popup>
            <div>
              <strong>{station.title}</strong>
              <br />
              Status: {station.active ? 'Available' : 'Unavailable'}
            </div>
          </Popup>
        </Marker>
      ))}

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <div>Your location</div>
          </Popup>
        </Marker>
      )}
    </>
  )
}

export const MapComponent = ({
  stations,
  userLocation,
  onStationSelect,
  isLoading,
}: MapContainerProps) => {
  // Calculate center point
  let center: [number, number]
  if (userLocation) {
    center = [userLocation.lat, userLocation.lng]
  } else if (stations.length > 0) {
    const avgLat =
      stations.reduce((sum, s) => sum + s.latitude, 0) / stations.length
    const avgLng =
      stations.reduce((sum, s) => sum + s.longitude, 0) / stations.length
    center = [avgLat, avgLng]
  } else {
    center = [52.3791, 4.9003] // Default to Amsterdam
  }

  useEffect(() => {
    const elem = document.querySelector('div.leaflet-bottom.leaflet-right')
    if (elem) {
      ;(elem as HTMLElement).style.display = 'none'
    }
  }, [])

  return (
    <div className='w-full h-[400px] relative rounded-lg overflow-hidden'>
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MapResizer />
        <MapMarkers
          stations={stations}
          userLocation={userLocation}
          onStationSelect={onStationSelect}
          isLoading={isLoading}
        />
      </MapContainer>
    </div>
  )
}
