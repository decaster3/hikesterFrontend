import React, { Component } from 'react';
class TextDisplay extends Component {

    render(){
        return (
          <h1>Here will be text from tags {this.props.expr} </h1>
        );
    }
}
export default TextDisplay
