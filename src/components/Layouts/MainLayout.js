import React from 'react';
import Navbar from './Navbar';
import MainMap from '../Map/MainMap';

class MainLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.children);
    return (
      <div>
        <Navbar />
        <div className="flex">
          {this.props.children}
          <div className="flex-60 content-map">
            <MainMap className="map" />
          </div>
        </div>
      </div>
    );
  }

}

export default MainLayout;
