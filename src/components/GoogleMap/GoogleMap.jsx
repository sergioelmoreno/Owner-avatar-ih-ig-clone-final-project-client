import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

const GoogleMap = ({ lat, lng }) => {
  const position = { lat, lng }
  const MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  return (
    <APIProvider apiKey={MAP_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
      <Map defaultCenter={position} defaultZoom={17} style={{ height: '200px' }}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

export default GoogleMap