import React, { Component } from 'react';
import { render } from 'react-dom';
import Search from '../src/components/MainWorkSpace/FindEvent/Search'
class Main extends Component {

    render(){
        return (
          <Search/>
        );
    }
}
render (<Main/>, window.document.getElementById('app'))
