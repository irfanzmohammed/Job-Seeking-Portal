import  { useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const GoogleMapComponent = ({ collegeName }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: collegeName }, (results, status) => {
      if (status === 'OK') {
        const { location } = results[0].geometry;
        setPosition(location);
      }
    });
  }, [collegeName]);

  const mapStyles = {
    width: '300px',
    height: '300px',
  };

  return (
    <div style={mapStyles}>
      <LoadScript googleMapsApiKey="AIzaSyBsJBC_V3C_CRj71g0zoSUsQDVRD5qr2Ts">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={14}
          center={position}
        >
          {position && <Marker position={position} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
