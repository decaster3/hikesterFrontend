import React, { Component } from 'react';
import 'whatwg-fetch'
import style from './form.scss';
import Tags from './Tags';
import {browserHistory} from 'react-router';

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
        tags: allTags,
        currentSelectedTags: []
      });
    });
  }

  onSubmit(e){

    this.state.location = this.props.location;
    e.preventDefault();

    const url = "http://192.168.137.1:3000/v1/event/new"

    var values = {
      "profile_id": 1,
      "name": this.state.title,
      "description": this.state.description,
      "lattitude": this.state.location.lat,
      "longitude": this.state.location.lng,
      "date": this.state.date,
      "time": this.state.time,
      "types": this.state.currentSelectedTags
    }

    values["types"] = values["types"].map(type => {
      return type.name;
    });

    var data = new FormData();

    for(var key in values) {
        data.append(key, values[key]);
        console.log(key + " " + values[key]);
    }

    console.log(values);
    console.log(data);

    fetch(url,
    {
        method: "POST",
        body: data
    })
    .then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      console.log(data);
      console.log("Event created: " + data);
      browserHistory.push('/single/' + data);
    })


  };

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
}
export default FormCreate
