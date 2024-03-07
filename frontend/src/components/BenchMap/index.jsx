import { useEffect, useRef, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const BenchMap = ({ benches, mapOptions }) => {
  const [map, setMap] = useState(null)
  const mapRef = useRef(null);
  const markersRef = useRef({}); // bench id: google.maps.Marker object

  useEffect(() => { // useEffect to set up the map
    if (!map) {
      const options = { zoom: 12, center: { lat: 37.7749, lng: -122.4194 }, ...mapOptions};
      const googleMap = new window.google.maps.Map(mapRef.current, options)
      setMap(googleMap);
    }
  }, [map, mapOptions])

  useEffect(() => { // Create/ remove markers when benches update
    updateMarkers();
  }, [benches]); 

  const updateMarkers = () => {
    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.setMap(null))

    // Create new markers for each bench
    const newMarkers = {};
    benches.forEach(bench => {
      const markerPosition = new window.google.maps.LatLng(bench.lat, bench.lng);

        // Create marker 
        const marker = new window.google.maps.Marker({ position: markerPosition });

        newMarkers[bench.id] = marker;
    })

    // Update the markers ref
    markersRef.current = newMarkers
  };

  return (
    <div ref={mapRef}>MapMap💗</div>
  )
}

const BenchMapWrapper = (props) => {
  return (
    <Wrapper
      apiKey={process.env.REACT_APP_MAPS_API_KEY}
    >
      <BenchMap props={props} />
    </Wrapper>
  )
}

export default BenchMapWrapper