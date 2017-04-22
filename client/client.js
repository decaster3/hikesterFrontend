import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../src/components/HomePage/App'
import MainMap  from '../src/components/Map/MainMap'
class Main extends Component {

    render(){
        return (
          <MainMap/>
          <App/>
        );
    }
}
render (<Main/>, window.document.getElementById('app'))
