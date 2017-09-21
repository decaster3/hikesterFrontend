import React, { Component } from 'react';
import 'whatwg-fetch'
import style from './form.scss';
import Tags from './Tags';
import {browserHistory} from 'react-router';

var firebase = require('../firebasecomp.js')();

var database = firebase.database().ref();

const geofire = require('geofire');
const geofireRef = new geofire(firebase.database().ref('locations'))


class FormCreate extends Component {
  constructor(props){
    super(props);
    var arr = ["Go on trip", "by car"]

    this.state = {      
      description: '',
      title: '',
      lat: '',
      lng: '',
      date_begin: '',
      date_end: '',
      time_begin: '',
      time_end: '',
      locality: '',
      country: '',
      cost: '',
      address: '',      
      people_count: '',
      creator_rating: '5',
      types: [...arr],
      tags: [],
      currentUser: [],
      currentSelectedTags: [],
      currentTags: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.getCurUser = this.getCurUser.bind(this)
  }

  getCurUser(snap){
     
      this.currentUser = snap.val()
  }

  componentDidMount() {


    var usersrUrl = database.child("users")
    var firstTags = [];
    var allTags = [];
    var types = [];
    var t = this;
    var user = firebase.auth().currentUser;
    var uid = 't0d1czkMysbAT3hL8rNPURXSNjr2'

    usersrUrl.orderByChild("id").equalTo(uid).once("value", this.getCurUser)


    var a = firebase.auth()
    console.log(firebase.auth().currentUser)
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


  onSubmit(e){

    this.state.location = this.props.location;
    e.preventDefault();

    var usersrUrl = database.child("users")
    var url = database.child("events");
    var user = firebase.auth().currentUser;
    console.log(user)
    if (user) {    
   
    console.log(this.currentUser)
    var values = {      
      "people_count": 1,      
      "creator": this.currentUser,
      "name": this.state.title,
      "description": this.state.description,
      "lat": this.state.location.lat,
      "lng": this.state.location.lng,
      "date_begin": this.state.date_begin,
      "date_end": this.state.date_end,
      "time_begin": this.state.time_begin,
      "date_end": this.state.date_end,
      "locality": this.state.locality,
      "country": this.state.country,           
      "creator_rating": parseFloat('5'),      
      "cost": parseFloat(this.state.cost),
      "address": this.state.address,
      "type": this.state.currentSelectedTags[0]['name'],
      "participants":this.currentUser          
      
    };

    

    var data = new FormData();

    for(var key in values) {
        data.append(key, values[key]);        
    }
    
    
    var push = url.push();
    var key = push.key;
    values.event_id = key;
    push.set(values);
    console.log(this.currentUser)

    var usersRef = usersrUrl.child(this.currentUser['t0d1czkMysbAT3hL8rNPURXSNjr2'].id).child("events/"+values.event_id.toString()).set(values)

    geofireRef.set(values.event_id, [values.lat,values.lng]).then(function() {
 
    })

    console.log(key);
    browserHistory.push('/single/' + key);  
    }

    else {
      browserHistory.push('/login/' + key);
    }
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
     this.state.currentSelectedTags[0] = tag;
    this.setState({currentSelectedTags: this.state.currentSelectedTags});
    console.log(this.state.currentSelectedTags);
  }

  render(){
    if(firebase.auth().currentUser != null)
    {
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
                  <h4>Дата начала</h4>
                  <input
                  value = {this.state.date_begin}
                  onChange = {this.onChange}
                  type = 'text'
                  name = 'date_begin'
                  placeholder = 'Дата'
                  />
                </div>

                <div className="form-group">
                  <h4>Дата окончания</h4>
                  <input
                  value = {this.state.date_end}
                  onChange = {this.onChange}
                  type = 'text'
                  name = 'date_end'
                  placeholder = 'Дата'
                  />
                </div>

                <div className="form-group">
                  <h4>Время начала</h4>
                  <input
                  value = {this.state.time_begin}
                  onChange = {this.onChange}
                  type = 'text'
                  name = 'time_begin'
                  placeholder = 'Время'
                  />
                </div>


                <div className="form-group">
                  <h4>Время окончания</h4>
                  <input
                  value = {this.state.time_end}
                  onChange = {this.onChange}
                  type = 'text'
                  name = 'time_end'
                  placeholder = 'Время'
                  />
                </div>

                <div className="filters">
                  <div className="tag-filter">
                    <h4>Выберите тэг</h4>
                    <Tags tags={this.state.currentTags} allTags={this.state.tags} changeTags={this.handler.bind(this)} selectTag={this.selectTag.bind(this)} isClickable={true}/>
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
    else
    {
      return(<div>First login</div>);
    }
    
  }
}
export default FormCreate
