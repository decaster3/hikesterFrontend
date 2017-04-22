import React, { Component } from 'react';
import 'whatwg-fetch'
import styles from './search.scss'
import Tags from './Tags'
class Search extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentTags: [],
      tags: []
    }
    this.handler = this.handler.bind(this)
  }

  componentWillMount(){
    var fisrstTags = []
    var allTags = []
    const url = "http://192.168.137.1:3000/v1/eventtypes"

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var result = data.event_types
      result.map((r) => {
        if (r.parent_event_type_id === 0)
          fisrstTags.push({id: r.id, name: r.name, parent: r.parent_event_type_id})

        var key1 = r.parent_event_type_id;
        var value = allTags[key1]

        if (value === undefined) {
          value = []
        }

        value.push(r);
        allTags[key1.toString()] = value;
      })
    })
    .then(() => {
      this.setState({
        currentTags: fisrstTags,
        tags: allTags
      });
    })

  }

  handler(e, ts) {

    this.setState({
      currentTags: ts
    })

  }

  render(){
    return (
      <div className="search">
        <Tags  tags = {this.state.currentTags} allTags = {this.state.tags} changeTags = {this.handler} />
      </div>

    );
  }
}
export default Search
