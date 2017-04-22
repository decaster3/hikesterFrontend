import canUseDOM from "can-use-dom";
import FormCreate from './FormCreate';
import raf from "raf";
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Circle,
  Marker
} from "react-google-maps";

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

const GeolocationExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    center={props.center}
    onClick={props.onMapClick}
  >

    {props.center && (
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.20,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    )}
    {props.markers.map((marker, index) =>
      <Marker position={marker.position} key={index} />
    )}
  </GoogleMap>
));

/*
 * https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class MapCreate extends Component {
  constructor(props){
    super(props)
    this.state = {
      markers: [],
      center: null,
      content: null,
      radius: 2000,
    };
    this.handleMapClick = this.handleMapClick.bind(this)
    this.isUnmounted = false;
  }



  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({ radius: Math.max(this.state.radius - 20, 0) });

      if (this.state.radius > 200) {
        raf(tick);
      }
    };
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `Location found using HTML5.`,
      });

      raf(tick);
    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 60,
          lng: 105,
        },
        content: `Error: The Geolocation service failed (${reason}).`,
      });
    });
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleMapClick(event) {
    this.setState({
      center: event.latLng,
      markers: [
        ...this.state.markers,
        { position: event.latLng },
      ],
    });
  
    this.props.locationn = this.state.markers[0].position
  }

  render() {
    return (
      <GeolocationExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMapClick={this.handleMapClick}
        markers={this.state.markers}
        center={this.state.center}
        content={this.state.content}
        radius={this.state.radius}
      />
    );
  }
}
