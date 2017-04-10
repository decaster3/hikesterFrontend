import React, { Component } from 'react';
import { render } from 'react-dom';
import Form from '../src/components/Autorization/SignUp/Form'
class Main extends Component {
    render(){
        return (
          <Form/>
        );
    }
}
render (<Main/>, window.document.getElementById('app'))
