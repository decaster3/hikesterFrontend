import React, { Component } from 'react';
import 'whatwg-fetch'
import style from './form.scss';
import Tags from './Tags';
import {browserHistory} from 'react-router';

var firebase = require('../firebasecomp.js')();

var database = firebase.database().ref();

class FormCreate extends Component {
  constructor(props){
    super(props);
    var arr = ["Go on trip", "by car"]

    this.state = {      
      description: '',
      title: '',
      location: {},
      date: '',
      time: '',
      locality: '',
      country: '',
      cost: '',
      address: '',
      duration: '',
      people_count: '',
      creator_rating: '5',
      types: [...arr],
      tags: [],
      currentSelectedTags: [],
      currentTags: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {

    var firstTags = [];
    var allTags = [];
    var types = [];
    var t = this;
    
    database.child("event_types").orderByKey().once("value", function(snapshot) {
      firstTags = snapshot.val()
      allTags = snapshot.val()
     snapshot.val().map((r) => {

        // if (r.parent_event_type_id === 0)
        //   firstTags.push({id: r.id, name: r.name, parent: r.parent_event_type_id})

        // var key1 = r.parent_event_type_id;        
        // var value = allTags[key1]

        // if (value === undefined) {
        //   value = []
        // }

        // value.push(r);
        // allTags[key1.toString()] = value;      

      });  
        t.setState({
        currentTags: firstTags,
        tags: allTags,
        currentSelectedTags: ''
      }); 

  
    });

  
  }

  onSubmit(e){

    this.state.location = this.props.location;
    e.preventDefault();

    var url = database.child("events");

    var values = {      
      "people_count": 1,      
      "creator_id": 0,
      "name": this.state.title,
      "description": this.state.description,
      "lattitude": this.state.location.lat,
      "longitude": this.state.location.lng,
      "date": this.state.date,
      "locality": this.state.locality,
      "country": this.state.country,
      "time": this.state.time,
      "people_count": this.state.time.people_count,
      "creator_rating": '5',
      "duration": this.state.duration,
      "cost": this.state.cost,
      "address": this.state.address,
      "type": this.state.currentSelectedTags,
      "users":{
        "0": 0
      }
    };

    

    var data = new FormData();

    for(var key in values) {
        data.append(key, values[key]);        
    }
    
    
    var push = url.push();
    var key = push.key;
    values.event_id = key;
    push.set(values);



    console.log(key);
    browserHistory.push('/single/' + key);    


  }

  onChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
  };

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

  render(){
     console.log(this.state.currentTags)
    return (
      <div className="flex-40 content-form events-create">
        <form onSubmit = {this.onSubmit}>

          <div className="form-group">
            <h4>Название события</h4>
            <input
            value = {this.state.title}
            onChange = {this.onChange}
            type = 'text'
            name = 'title'
            placeholder = 'Название'
            />
          </div>

          <div className="form-group">
            <label>Описание</label>
            <textarea
            value = {this.state.description}
            onChange = {this.onChange}
            name = 'description'
            placeholder = 'Описание..'
            />
          </div>

          <div className="form-group">
            <h4>Город</h4>
            <input
            value = {this.state.locality}
            onChange = {this.onChange}
            type = 'text'
            name = 'locality'
            placeholder = 'LA'
            />
          </div>

          <div className="form-group">
            <h4>Страна</h4>
            <input
            value = {this.state.country}
            onChange = {this.onChange}
            type = 'text'
            name = 'country'
            placeholder = 'USA'
            />
          </div>

          <div className="form-group">
            <h4>Адрес</h4>
            <input
            value = {this.state.address}
            onChange = {this.onChange}
            type = 'text'
            name = 'address'
            placeholder = 'Brooklyn'
            />
          </div>

          <div className="form-group">
            <h4>Продолжительность(Часы)</h4>
            <input
            value = {this.state.duration}
            onChange = {this.onChange}
            type = 'text'
            name = 'duration'
            placeholder = '5'
            />
          </div>

          <div className="form-group">
            <h4>Стоимость</h4>
            <input
            value = {this.state.cost}
            onChange = {this.onChange}
            type = 'text'
            name = 'cost'
            placeholder = '10'
            />
          </div>



          <div className="form-group">
            <h4>Дата</h4>
            <input
            value = {this.state.date}
            onChange = {this.onChange}
            type = 'text'
            name = 'date'
            placeholder = 'Дата'
            />
          </div>

          <div className="form-group">
            <h4>Время</h4>
            <input
            value = {this.state.time}
            onChange = {this.onChange}
            type = 'text'
            name = 'time'
            placeholder = 'Время'
            />
          </div>

          <div className="filters">
            <div className="tag-filter">
              <h4>Выберите тэг</h4>
              <Tags tags={this.state.tags} allTags={this.state.tags} changeTags={this.handler.bind(this)} selectTag={this.selectTag.bind(this)} isClickable={true}/>
            </div>
            <div className="tag-selected">
              <h4>Выбранные тэги</h4>
              <Tags tags={this.state.currentSelectedTags} isClickable={false} />
            </div>
          </div>

          <h4 className="warning">Поставьте метку события на карте</h4>

          <button className="button submit">Создать событие</button>

        </form>
      </div>
    );
  }
}
export default FormCreate
