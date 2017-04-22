import React, { Component } from 'react';
import FormCreate from './FormCreate'
import MapCreate from './MapCreate'
class MainCreate extends Component {
  constructor (props){
    super(props)
    this.state = {
      location: {}
    }
  }
  render(){
      return (<div>
          <FormCreate location = {this.state.location}/>
          <MapCreate locationn = {this.state.location}/>
        </div>
      );
  }
}
export default MainCreate
