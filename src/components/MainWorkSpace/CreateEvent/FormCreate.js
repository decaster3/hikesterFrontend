import React, { Component } from 'react';
import 'whatwg-fetch'
class FormCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      discription: '',
      title: '',
      location: this.props.location,
      date: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e){
    e.preventDefault();
    console.log(this.state);
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


                <button>Create Event</button>

            </form>
        );
    }
}
export default FormCreate
