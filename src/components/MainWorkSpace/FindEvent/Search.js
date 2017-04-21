import React, { Component } from 'react';
import 'whatwg-fetch'
import Tags from './Tags'
class Search extends Component {

  constructor(props){
    super(props)
    this.state = {
      tags: []
    }

  }
  componentWillMount(){
    var tags3 = []
    const url = "http://192.168.137.1:3000/v1/eventtypes"
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var result = data.event_types
      result.map((r) => {
        tags3.push({id: r.id, name: r.name})
      })
      console.log(this.tags)
    }).then(() => {
      this.setState({
        tags: tags3
      });
    })

}

    render(){
        return (
          <div>
            <Tags tags = {this.state.tags} />
          </div>
        );
    }
}
export default Search
