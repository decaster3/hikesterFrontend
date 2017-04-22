import canUseDOM from "can-use-dom";

import raf from "raf"

import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  InfoWindow,
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


const ClosureListenersExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={13}
    center={props.center}
  >
  {props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
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
      />  )}
    {props.markers.map((marker, index) => {
      const onClick = () => props.onMarkerClick(marker);
      const onCloseClick = () => props.onCloseClick(marker);

      return (
        <Marker
          key={index}
          position={marker.position}
          title={(index + 1).toString()}
          onClick={onClick}
        >
          {marker.showInfo && (
            <InfoWindow onCloseClick={onCloseClick}>
              <div>
                <strong>{marker.content}</strong>
                <br />
                <h1>EVENT1</h1><button>Join</button>
              </div>
            </InfoWindow>
          )}
        </Marker>
      );
    })}
  </GoogleMap>
));

function generateInitialMarkers() {
  const southWest = new google.maps.LatLng(55.752634, 48.744172);
  const northEast = new google.maps.LatLng(55.752634, 48.744172);

  const lngSpan = northEast.lng() - southWest.lng();
  const latSpan = northEast.lat() - southWest.lat();

  const markers = [];
  for (let i = 0; i < 1; i++) {
    const position = new google.maps.LatLng(
      southWest.lat() + latSpan * Math.random(),
      southWest.lng() + lngSpan * Math.random()
    );
    markers.push({
      position,
      content: `This is the secret message`.split(` `)[i],
      showInfo: false,
    });
  }
  return markers;
}

/*
 * https://developers.google.com/maps/documentation/javascript/examples/event-closure
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class MainMap extends Component {
  constructor(props){
      super(props)
      this.state = {
        center: null,
        content: null,
        radius: 2000,
        markers: generateInitialMarkers(),
      };
      this.isUnmounted = false;
      this.handleMarkerClick = this.handleMarkerClick.bind(this);
      this.handleCloseClick = this.handleCloseClick.bind(this);
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
        content: `Here your current geolocation`,
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

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleCloseClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render() {
    return (
      <ClosureListenersExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.center}
        content={this.state.content}
        radius={this.state.radius}
        onMarkerClick={this.handleMarkerClick}
        onCloseClick={this.handleCloseClick}
        markers={this.state.markers}
      />
    );
  }
}