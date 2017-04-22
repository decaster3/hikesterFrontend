import React, { Component } from 'react';

class SearchResult extends Component {
    constructor(props){
      super(props);
    }



    render(){
        var eventList = this.props.events.map((e, i) => {
          return (
            <li key={"event_" + i}>
            <a href="#"><h4>{e.name}</h4></a>
            <p>image:{e.image}</p>
            <p>{e.description}</p>
            <p>corditanes:</p>
            {e.lattitude} {e.longitude}
            </li>
           );
        });
        return (<div>
            <h3>Result for: {this.props.request}</h3>
            <ul>{eventList}</ul>
        </div>
        );
    }


}
export default SearchResult
