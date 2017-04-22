import React, { Component } from 'react';
import { render } from 'react-dom';
import MainMap  from '../src/components/Map/MainMap'
class Main extends Component {

    render(){
        return (
          <MainMap/>
        );
    }
}
render (<Main/>, window.document.getElementById('app'))
