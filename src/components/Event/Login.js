import React from 'react';
import Single from './Single';
import SingleEventMap from './SingleEventMap';
import Navbar from '../Layouts/Navbar';
import FacebookLogin from 'react-facebook-login';
import UserEvents from './UserEvents';



var firebase = require('../firebasecomp.js')();


var database = firebase.database();
  class Login extends React.Component {

    constructor (props){
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
}

	onSubmit(e){

		firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
		  console.log(error.message);
		});
	};

	onChange(e){
		 this.setState({
        	[e.target.name]: e.target.value
    		})
	};


	render(){
		return(

	  <form onSubmit = {this.onSubmit}>

          <div className="form-group">
            <h4>Login</h4>
            <input
            value = {this.state.username}
            name = 'username'
            onChange = {this.onChange}            
            placeholder = 'Login'
            />
          </div>
           <div className="form-group">
            <h4>Password</h4>
            <input
            value = {this.state.password}
            name = 'password'
            onChange = {this.onChange}            
            placeholder = 'Password'
            />
          </div>         

          <button className="button submit">Зарегистрироваться</button>

        </form>

		)
	}
}

export default Login