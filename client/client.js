import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../src/components/HomePage/App'
class Main extends Component {

    render(){
        return (
          <App/>
        );
    }
}
render (<Main/>, window.document.getElementById('app'))
