import canUseDOM from "can-use-dom";
import styles from './map.scss'
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

var firebase = require('../firebasecomp.js')();
var database = firebase.database();
const geofire = require('geofire');
const geofireRef = new geofire(firebase.database().ref('locations'))


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
        fillColor: 'blue',
        fillOpacity: 0.20,
        strokeColor: 'blue',
        strokeOpacity: 1,
        strokeWeight: 1,
      }} />
  )}
  {props.markers.map((marker1, index) => {
    const onClick = () => props.onMarkerClick(marker1);
    const onCloseClick = () => props.onCloseClick(marker1);
    const m = marker1;
    
    return (        
      <Marker
        key={index}
        position={m.position}
        title={m.name}
        onClick={onClick}
      >
        {marker1.showInfo && (

          <InfoWindow onCloseClick={onCloseClick}>              
            <div>
              <h2>{m.name}</h2>
              <br/>
              <h2>{m.description}</h2>                                 
              <button className="button submit">Присоединиться</button>
            </div>
          </InfoWindow>
        )}
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
export default class MainMap extends Component {
  constructor(props){
      super(props)
      this.state = {
        center: null,
        content: [],
        radius: 2000,
        markers: [],
        events: [],
        kostil_events: [],
        kostil_markers: []
      };
      this.isUnmounted = false;
      this.handleMarkerClick = this.handleMarkerClick.bind(this);
      this.handleCloseClick = this.handleCloseClick.bind(this);
      this.generateInitialMarkers = this.generateInitialMarkers.bind(this);
      this.kistil = this.kostil.bind(this)
      this.markers = this.markers.bind(this)
      this.superMarkers = this.superMarkers.bind(this)
      this.kostil_markers = this.kostil_markers.bind(this)
      this.kostil_superMarkers = this.kostil_superMarkers.bind(this)
      this.generateInitialKostilMarkers = this.generateInitialKostilMarkers.bind(this)
  }

  generateInitialMarkers(e) {
    const markers = [];

    this.state.events.map((event)=> {
      const lat = event.lat;
      const lng = event.lng;

      const position = new google.maps.LatLng(lat,lng);

      markers.push({
        position,
        description: event.description,
        name: event.name,
        showInfo: false,
      });
    })

    return markers;
  }


   generateInitialKostilMarkers(e) {
    const kostil_markers = [];

    this.state.kostil_events.map((event)=> {
      const lat = event.lat;
      const lng = event.lng;

      const position = new google.maps.LatLng(lat,lng);

      kostil_markers.push({
        position,
        description: event.description,
        name: event.name,
        showInfo: false,
      });
    })

    return kostil_markers;
  }

  componentDidMount() {
   
    this.kostil()
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
    geolocation.getCurrentPosition((position) => {
          
        var geoQuery = geofireRef.query({
          center: [position.coords.latitude, position.coords.longitude],
          radius: 10 //kilometers
        });

        geoQuery.on("key_entered", this.markers)

         
  });
}


    markers(key, location, distance){
      
      database.ref('events').child(key)
        .once('value')
        .then(this.superMarkers)

      
   }



   superMarkers(snapshot){

    var value = snapshot.val();
    this.state.events.push(value)
    console.log(this.state.events)
    this.setState({
          markers: this.generateInitialMarkers()          
      })
    this.forceUpdate()
   }


    kostil_markers(key, location, distance){
      
      database.ref('events').child(key)
        .once('value')
        .then(this.kostil_superMarkers)

      
   }



   kostil_superMarkers(snapshot){

    var value = snapshot.val();
    this.state.kostil_events.push(value)    
    this.setState({
          kostil_markers: this.generateInitialKostilMarkers()          
      })
    this.forceUpdate()
   }

  kostil(){
      geolocation.getCurrentPosition((position) => {
          
        var geoQuery = geofireRef.query({
          center: [position.coords.latitude, position.coords.longitude],
          radius: 100 //kilometers
        });

         geoQuery.on("key_entered", this.kostil_markers)

         
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
     this.forceUpdate()
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
    this.forceUpdate()
  }

  render() { 
    return (<div className="map">
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
      </div>
    );
  }
}
