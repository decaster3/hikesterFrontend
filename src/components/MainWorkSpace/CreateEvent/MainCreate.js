import React, { Component } from 'react';
import FormCreate from './FormCreate'
import MapCreate from './MapCreate'
class MainCreate extends Component {
  constructor (props){
    super(props)
    this.state = {
      location: {1:2}
    }
  }

  setLocation(location, e) {
    this.setState({
      location: location
    })
  }

  render(){
      return (<div>
        <FormCreate location = {this.state.location}/>
          <MapCreate setLocation = {this.setLocation.bind(this)}/>
        </div>
      );
  }
}
export default MainCreate
