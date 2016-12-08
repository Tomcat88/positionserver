import React from 'react'
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import _ from "underscore";

class MapComponent extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    const positions = this.props.coords;
    var markers = [];
    if(positions) {
      markers = _.map(positions, function(pos, i) {
        return {
          position: {
            lat: pos.lat,
            lng: pos.lng
          },
          key: i,
          defaultAnimation: 2
        }
      });
    }
    this.state = {
      markers,
      readOnly: this.props.readOnly || false
    };
    console.log(this.state);
  }

  onMapClick(event) {
    if(!this.state.readOnly) {
      let { markers } = this.state;
      if(this.props.addingPos) { // In adding phase i want to add just one position
        markers = [];
      }
      markers.push({
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(),
      });
      console.log(markers);
      this.setState({ markers });
      this.props.handlePositionChange(
        _.map(markers,
              m => ({ 
                lat: m.position.lat(),
                lng: m.position.lng()
              })));
    }
  }

  render() {
    const markers = _.map(this.state.markers, (m) => {
      return <Marker {...m} />
    });
    const center = this.state.center || { lat: 45.509495 ,lng: 8.81567 }
    return (
      <GoogleMapLoader
        query={{ key: GOOGLE_MAPS_API_KEY, libraries: "geometry,drawing,places" }}
        containerElement={
          <div
            style={{
                marginTop: "20px",
                height: "300px",
              }}
            />
                         }
        googleMapElement={
          <GoogleMap
            ref={(map) => map}
            defaultZoom={3}
            defaultCenter={center}
            onClick={this.onMapClick.bind(this)} >
              {markers}
          </GoogleMap>
        }
      />
    );
  }
}

export default MapComponent;
