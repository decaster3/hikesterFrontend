import React, { Component } from 'react';
import 'whatwg-fetch'
import styles from './form.scss'
import Tags from './Tags'
import EventList from './EventList'

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentTags: [],
      currentSelectedTags: [],
      tags: [],
      events: []
    }
    this.handler = this.handler.bind(this)
    this.selectTag = this.selectTag.bind(this)
    this.sendRequest = this.sendRequest.bind(this)
  }

  componentWillMount() {
    var firstTags = [];
    var allTags = [];
    const url = "http://192.168.137.1:3000/v1/eventtypes";

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var result = data.event_types
      result.map((r) => {
        if (r.parent_event_type_id === 0)
          firstTags.push({id: r.id, name: r.name, parent: r.parent_event_type_id})

        var key1 = r.parent_event_type_id;
        var value = allTags[key1]

        if (value === undefined) {
          value = []
        }

        value.push(r);
        allTags[key1.toString()] = value;
      });
    }).then(() => {
      this.setState({
        currentTags: firstTags,
        tags: allTags
      });
    });
  }

  handler(e, ts) {
    this.setState({
      currentTags: ts
    });
  }

  selectTag(tag, e) {
    this.state.currentSelectedTags.push(tag);
    this.setState({currentSelectedTags: this.state.currentSelectedTags});
    console.log(this.state.currentSelectedTags);
  }

  sendRequest(e) {
    var value = JSON.parse(JSON.stringify(this.state.currentSelectedTags));
    const url = "http://192.168.137.1:3000/v1/event/search"
    value = value.map(type => {
      return type.name;
    });

    var data = new FormData();
    data.append("types", value[value.length - 1]);

    console.log(value[value.length - 1]);

    fetch(url,
    {
        method: "POST",
        body: data
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        events: data.events,
        currentSelectedTags: [],
        currentTags: this.state.tags["0"]
      });
    });
  }

  render() {
    return (
      <div className="flex-40 content-form events-search">
        <div className="filters">
          <div className="tag-filter">
            <h4>Выберите тэг</h4>
            <Tags tags={this.state.currentTags} allTags={this.state.tags} changeTags={this.handler} selectTag={this.selectTag} isClickable={true}/>
          </div>
          <div className="tag-selected">
            <h4>Выбранные тэги</h4>
            <Tags tags={this.state.currentSelectedTags} isClickable={false} />
          </div>
          <button className="button submit" onClick={this.sendRequest}>Найти</button>
        </div>
        <div className="events">
          <h4>Найденные события</h4>
          <EventList events={this.state.events}/>
        </div>
      </div>
    );
  }
}
export default Search
