import React, { Component } from 'react';
import 'whatwg-fetch'
class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password_confirmation: ''

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

                <label>User name </label>
                <input
                value = {this.state.username}
                onChange = {this.onChange}
                type = 'text'
                name = 'username'
                />

                <label>Email </label>
                <input
                value = {this.state.email}
                onChange = {this.onChange}
                type = 'text'
                name = 'email'
                />

                <label>Password </label>
                <input
                value = {this.state.password}
                onChange = {this.onChange}
                type = 'text'
                name = 'password'
                />

                <label>Password confirmation </label>
                <input
                value = {this.state.password_confirmation}
                onChange = {this.onChange}
                type = 'text'
                name = 'password_confirmation'
                />

                <button>Sign up</button>

            </form>
        );
    }
}
export default Form




//   signUp() {
//     var emailr = this.refs.email.value;
//     var passwordr = this.refs.password.value;
//     var password_confirmationr = this.refs.password_confirmation.value;
//     var usernamer = this.refs.username.value;
//     var FormData = require('form-data');
//     var form = new FormData();
//
//     form.append('email', emailr);
//     form.append('username', usernamer);
//     form.append('password', passwordr);
//     form.append('password_confirmation', password_confirmationr);
//     console.log(form);
//
//     fetch('http://192.168.137.1:3000/v1/register', {
//       method: "POST",
//       body: form
//     })
// }
