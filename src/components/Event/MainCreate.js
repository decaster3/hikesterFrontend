import React, { Component } from 'react';
import FormCreate from './FormCreate';
import MapCreate from './MapCreate';
import Navbar from '../Layouts/Navbar';

class MainCreate extends Component {

  constructor (props){
    super(props)
    this.state = {
      location: {}
    }
  }

  setLocation(location, e) {
    this.setState({
      location: location
    })
  }

  render(){
      return (
        <div>
          <Navbar />
          <div className="flex">
            <FormCreate location={this.state.location}/>
            <div className="flex-60 content-map">
              <MapCreate className="map" setLocation={this.setLocation.bind(this)}/>
            </div>
          </div>
        </div>
      );
  }
}
export default MainCreate
