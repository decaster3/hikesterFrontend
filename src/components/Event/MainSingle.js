import React, { Component } from 'react';
import Single from './Single';
import SingleEventMap from './SingleEventMap';
import Navbar from '../Layouts/Navbar';

class MainCreate extends Component {

  constructor (props){
    super(props)
    this.state = {
      events: []
    }
    this.eventGetHandler = this.eventGetHandler.bind(this);
  }

  eventGetHandler(event, e) {
    console.log(event);
    var events = [event];
    console.log(events);
    this.setState({events});
  }

  render(){
      return (
        <div>
          <Navbar />
          <div className="flex">
            <Single id={this.props.params.id} eventHandle={this.eventGetHandler} />
            <div className="flex-60 content-map">
              <SingleEventMap className="map" events={this.state.events} center={{lat: 55.7556, lng: 55.7556}} content={"text"}/>
            </div>
          </div>
        </div>
      );
  }
}
export default MainCreate
