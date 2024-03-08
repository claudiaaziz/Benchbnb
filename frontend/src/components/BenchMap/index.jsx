import { useEffect, useRef, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const BenchMap = ({ benches, mapOptions, markerEventHandlers, mapEventHandlers, from }) => {
  const [map, setMap] = useState(null)
  const mapRef = useRef(null);
  const markersRef = useRef({}); // bench.id: google.maps.Marker object

  useEffect(() => { // useEffect to set up the map
    if (!map) {
      const options = { zoom: 12, center: { lat: 37.73434011155514, lng: -122.37602233886719 }, ...mapOptions};
      const googleMap = new window.google.maps.Map(mapRef.current, options)
      if (mapEventHandlers) {
        Object.entries(mapEventHandlers).forEach(([event, handler]) => { // Apply map event handlers 
          window.google.maps.event.addListener(googleMap, event, (e) => handler(e, googleMap));
        });
      }
      setMap(googleMap);
    }
  }, [map, mapOptions, mapEventHandlers])

  useEffect(() => { // create/ update/ delete markers
    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.setMap(null));

    // Create new markers for each bench
    const newMarkers = {};
    Object.values(benches).forEach((bench) => {
      const coords = new window.google.maps.LatLng(bench.lat, bench.lng);

      // Create marker
      const marker = new window.google.maps.Marker({ 
        map,
        position: coords,
        // customizations
        label: { 
            text: `$${bench.price}`, 
            color: 'black',
            fontSize: '.6.5rem'
        }, 
        icon: {
            path: `
              M 10,30
              A 20,20 0,0,1 50,30
              A 20,20 0,0,1 90,30
              Q 90,60 50,90
              Q 10,60 10,30 z`,
            fillOpacity: 1,
            fillColor: 'white',
            strokeColor: '#ff385c',
            strokeWeight: 1,
            scale: .5,
            labelOrigin: new window.google.maps.Point(50, 50),
            anchor: new window.google.maps.Point(50, 50)
          },
        });

      // Apply marker event handlers
      if (markerEventHandlers) {
        Object.entries(markerEventHandlers).forEach(([event, handler]) => {
          marker.addListener(event, () => handler(bench));
        });
      }

      newMarkers[bench.id] = marker;
    });

    // Update the markers ref
    markersRef.current = newMarkers;
  }, [benches, map, markerEventHandlers]);

  return (
    <div className={`map-${from}`} ref={mapRef}></div>
  )
}

const BenchMapWrapper = (props) => {
  return (
    <Wrapper
      apiKey={process.env.REACT_APP_MAPS_API_KEY}
    >
      <BenchMap {...props} />
    </Wrapper>
  )
}

export default BenchMapWrapper