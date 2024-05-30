import React from 'react'
import GoogleMapReact from 'google-map-react';
function GoogleMap(props) {
  return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={props.lat}
          lng={props.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap