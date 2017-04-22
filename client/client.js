import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../src/components/HomePage/App'
import MainMap  from '../src/components/Map/MainMap'
import MainCreate  from '../src/components/MainWorkSpace/CreateEvent/MainCreate'

class Main extends Component {

    render(){
        return (<div>
            <MainCreate/>
          </div>
        );
    }
}
render (<Main/>, window.document.getElementById('app'))
