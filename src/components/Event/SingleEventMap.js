import canUseDOM from "can-use-dom";
import styles from '../Map/map.scss'
import raf from "raf"
import { browserHistory } from 'react-router';

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
      failure("Your browser doesn't support geolocation.");
    },
  })
);


const ClosureListenersExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={13}
    center={props.center}
  >
    {props.markers.map((marker, index) => {
      const onClick = () => props.onMarkerClick(marker);
      const onCloseClick = () => props.onCloseClick(marker);

      console.log(marker);

      return (
        <Marker
          key={index}
          position={marker.position}
          title={(index + 1).toString()}
          onClick={onClick}
        >
          <InfoWindow onCloseClick={onCloseClick}>
            <div>
              <h2>{marker.name}</h2>
              <div>
                {marker.description}
              </div>
              { marker.showJoinButton == true ?
                  <button className="button submit" onClick={props.joinHandler} data-id={marker.id}>Присоединиться</button>
                  :
                  <div>Вы присоединились к данному событию</div>
              }
            </div>
          </InfoWindow>
        </Marker>
      );
    })}
  </GoogleMap>
));
/*
 * https://developers.google.com/maps/documentation/javascript/examples/event-closure
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class SingleEventMap extends Component {
  constructor(props){
      super(props)
      this.state = {
        markers: [],
        kostil_markers: []
      };
      this.isUnmounted = false;
      this.handleMarkerClick = this.handleMarkerClick.bind(this);
      this.handleCloseClick = this.handleCloseClick.bind(this);
      this.generateInitialMarkers = this.generateInitialMarkers.bind(this);
      this.joinHandler = this.joinHandler.bind(this);
  }

  generateInitialMarkers(e) {
    const markers = [];

    this.props.events.map((event)=> {
      const lat = event.lattitude;
      const lng = event.longitude;

      console.log(event);

      const position = new google.maps.LatLng(lat,lng);

      markers.push({
        position,
        description: event.description,
        name: event.name,
        id: event.id,
        showJoinButton: event.showJoinButton,
        showInfo: false,
      });
    })

    return markers;
  }

  componentDidMount() {

    this.setState({
      center: {
        lat: 55.7556,
        lng: 48.752008,
      },
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
    this.setState({
      markers: this.state.kostil_markers
    })
  }

  joinHandler(e) {
    const url = "http://192.168.137.1:3000/v1/event/user";

    var id = $(e.target).data('id');

    var data = new FormData();

    data.append('profile_id', 1);
    data.append('event_id', id);

    if (id === undefined)
      return;

    fetch(url,
    {
        method: "POST",
        body: data
    })
    .then((response) => {
      console.log(response);
      if (response.ok == true) {

      }
      // response.json()
    }).then((data) => {
      console.log(data);
      console.log("EventUser created: " + data);

    })
  }

  render() {
    return (
      <div className="map">
        <ClosureListenersExampleGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          center={this.state.center}
          onMarkerClick={this.handleMarkerClick}
          onCloseClick={this.handleCloseClick}
          joinHandler={this.joinHandler}
          markers={this.generateInitialMarkers()}
        />
      </div>
    );
  }
}
