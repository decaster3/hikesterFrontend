import React, { Component } from 'react';
import Button from '../../HomePage/Button'
import SearchResult from './SearchResult'

class TextDisplay extends Component {
    constructor(props){
      super(props);
      this.state = {
        events: []
      };
    }

    Search(e){
      var value = JSON.parse(JSON.stringify(this.props.request));
      console.log(value);
      const url = "http://192.168.137.1:3000/v1/event/search"


      var data = new FormData();
      data.append( "types", value );
      fetch(url,
      {
          method: "POST",
          body: data
      })
      .then((response) => response.json())
      .then((data) => {
        var events = []
        var result = data.events

        result.map((event) =>{
          events.push(event)
        })

        this.setState({
          events: events
        })

      })
    }

    render(){
        var text = this.props.expr;

        if (text.length == 0)
          text = "Here will be text from tags";
        else if (this.state.events.length == 0){
          text = "I would find ".concat(text);
        } else {
          console.log(this.props.tagsCount);
          if (this.props.tagsCount > 0)
            this.props.changeTags(this, [])
          return (<SearchResult events = {this.state.events} request = {text}/>)
        }
        return (<div>
          <h1> {text} </h1>
          <Button type={"highlight"} text={"Search"} click= {this.Search.bind(this)}/>
        </div>
        );
    }


}
export default TextDisplay
