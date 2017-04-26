import React from 'react';
import Navbar from './Navbar';
import MainMap from '../Map/MainMap';

class CreateEventLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="flex">
          {this.props.children}
          <div className="flex-60 content-map">
            <MapCreate className="map" setLocation={this.setLocation.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

}

export default CreateEventLayout;
