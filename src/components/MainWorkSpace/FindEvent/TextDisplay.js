import React, { Component } from 'react';
import Button from '../../HomePage/Button'
class TextDisplay extends Component {
    constructor(props){
      super(props);
    }

    Search(e){
      var value = JSON.parse(JSON.stringify(this.props.request));
      console.log("Sending request: " + value);
    }

    render(){
        var text = this.props.expr;
        if (text.length == 0)
          text = "Here will be text from tags";
        else {
          text = "I would find ".concat(text);
        }
        return (<div>
          <h1> {text} </h1>
          <Button type={"highlight"} text={"Search"} click= {this.Search.bind(this)}/>
        </div>
        );
    }


}
export default TextDisplay
