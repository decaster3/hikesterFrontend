import React, { Component } from 'react';
import 'whatwg-fetch'
class Form extends Component {

  signUp() {
    var emailr = this.refs.email.value;
    var passwordr = this.refs.password.value;
    var password_confirmationr = this.refs.password_confirmation.value;
    var usernamer = this.refs.username.value;
    var FormData = require('form-data');
    var form = new FormData();

    form.append('email', emailr);
    form.append('username', usernamer);
    form.append('password', passwordr);
    form.append('password_confirmation', password_confirmationr);
    console.log(form);

    fetch('http://192.168.137.1:3000/v1/register', {
      method: "POST",
      body: form
    })
}
    render(){
        return (
          <div className = "row">
                <input ref='email' placeholder='enter your email' />
                <input ref='username' placeholder='enter your   username' />
                <input ref='password' placeholder='enter your password' />
                <input ref='password_confirmation' placeholder='enter your password_confirmation' />
              <button onClick = {this.signUp.bind(this)}>Login</button>
              </div>
        );
    }
}
export default Form
