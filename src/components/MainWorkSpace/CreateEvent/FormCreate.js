import React, { Component } from 'react';
import 'whatwg-fetch'

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
      types: [...arr]
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e){

    this.state.location = this.props.location;
    e.preventDefault();

    const url = "http://192.168.137.1:3000/v1/event/new"

    var values = {"profile_id": 1,
      "name": this.state.title,
      "description": this.state.description,
      "lattitude": this.state.location.lat,
      "longitude": this.state.location.lng,
      "date": this.state.date,
      "time": this.state.time,
      "types": this.state.types
    }

    var data = new FormData();

    for(var key in values) {
        data.append( key, values[key] );
    }
    
    fetch(url,
    {
        method: "POST",
        body: data
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Event created: " + data);

    })


  };

  onChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
  };
    render(){
        return (
            <form onSubmit = {this.onSubmit}>

                <label>Title </label>
                <input
                value = {this.state.title}
                onChange = {this.onChange}
                type = 'text'
                name = 'title'
                />

                <label>Date </label>
                <input
                value = {this.state.date}
                onChange = {this.onChange}
                type = 'text'
                name = 'date'
                />

                <label>Description </label>
                <input
                value = {this.state.description}
                onChange = {this.onChange}
                type = 'text'
                name = 'description'
                />

                <label>Time </label>
                <input
                value = {this.state.time}
                onChange = {this.onChange}
                type = 'text'
                name = 'time'
                />

                <button>Create Event</button>

            </form>
        );
    }
}
export default FormCreate
