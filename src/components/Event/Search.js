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
      events: [],
      searchQuery: ''
    }
    this.handler = this.handler.bind(this)
    this.selectTag = this.selectTag.bind(this)
    this.sendRequest = this.sendRequest.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.showResults = this.showResults.bind(this)
    this.onChange = this.onChange.bind(this)
  }




  componentWillMount() {

    var firstTags = [];
    var allTags = [];
    var types = [];
    var t = this;
    
    database.child("event_types").orderByKey().once("value", function(snapshot) {

      firstTags = Array.from(snapshot.val())
      allTags = Array.from(snapshot.val())
     
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
    this.state.currentSelectedTags[0] = tag;
    this.setState({currentSelectedTags: this.state.currentSelectedTags});    
    this.sendRequest()
  }

  sendRequest(e) {
    var value = JSON.parse(JSON.stringify(this.state.currentSelectedTags));
    var url = database.child('search');
    value = value.map(type => {
      return type.name;
    });

    var query = {
      index: 'firebase',
      type: 'event'
    };

    var body = query.body = {};
    if(this.state.currentSelectedTags.length > 0){
    if(this.state.searchQuery != ''){
        
      body.query = {
        "bool": {
            "should": [
                      {"match": {
                      "type": this.state.currentSelectedTags[0]['name']
                         }},
                      {"match": {  
                      "_all": this.state.searchQuery 
                         }}
                    ]
                }
     }
      }
     else{
      
      body.query = {
      
      "match": {                
        "type": this.state.currentSelectedTags[0]['name']
      }
     }
    }
   }
   else{

     if(this.state.searchQuery != ''){  
     console.log('Entered')    
      body.query = {      
      "match": {  
        "_all": this.state.searchQuery
      }
   }
 }
}

   this.doSearch(query)
  }

  doSearch(query) { 
     
    var ref = database.child('search');
    var key = ref.child('request').push(query).key;   
    console.log(query)
    
    ref.child('response/'+key).on('value', this.showResults);
  }

  onChange(e){

    this.setState({
        [e.target.name]: e.target.value
    })
    
    setTimeout(this.sendRequest, 100)
  }


  showResults(snap){
    if( !snap.exists() ) {this.state.events = []; return; } 
    var dat = snap.val().hits;

    // when a value arrives from the database, stop listening
    // and remove the temporary data from the database
    snap.ref.off('value', this.showResults);
    snap.ref.remove();

    // the rest of this just displays data in our demo and probably
    // isn't very interesting
    if( snap.val().hits!= null && dat['hits']!= null){
      this.state.events = []
      dat['hits'].map((t) => {      
      this.state.events.push(t._source)
    });
    console.log(dat['hits'])    
    
    }
    this.forceUpdate()
  }


  render() {
    return (
      <div className="flex-40 content-form events-search">
        <div className="form-group">            
            <input
            value = {this.state.searchQuery}
            onChange = {this.onChange}
            name = 'searchQuery'
            placeholder = 'Search...'
            />
        </div>
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
