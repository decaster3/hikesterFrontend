import React, { Component } from 'react';
class TextDisplay extends Component {

    render(){
        return (
          <button>Here will be text from tags {this.props.expr} </button>
        );
    }
}
export default TextDisplay
