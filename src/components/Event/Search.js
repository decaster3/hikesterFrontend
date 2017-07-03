import React, { Component } from 'react';
import 'whatwg-fetch'
import styles from './form.scss'
import Tags from './Tags'
import EventList from './EventList'

var firebase = require('../firebasecomp.js')();

var database = firebase.database().ref();



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
    var types = [];
    var t = this;
    
    database.child("EventTypes").orderByKey().once("value", function(snapshot) {

     snapshot.val().map((r) => {

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
        t.setState({
        currentTags: firstTags,
        tags: allTags,
        currentSelectedTags: []
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
    var url = database.child('search');
    value = value.map(type => {
      return type.name;
    });

    var data = new FormData();
    data.append("types", value[value.length - 1]);


    
    var push = url.push();
    var key = push.key;
    push.set(value);

    url.child(key).on('child_changed', function(snap){
      var val = snap.val();
      this.setState({
        events: val.events,
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
