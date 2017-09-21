import React from 'react';
import Single from './Single';
import SingleEventMap from './SingleEventMap';
import Navbar from '../Layouts/Navbar';
import FacebookLogin from 'react-facebook-login';
import UserEvents from './UserEvents';



var firebase = require('../firebasecomp.js')();


var users = firebase.database().ref("users");
  class Login extends React.Component {

    constructor (props){
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      country: "",
      city: "",
      name: ""

    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
}

	onSubmit(e){
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
		  console.log(error.message);      
		}); 

    // var state = this.state
    // var user = firebase.auth().currentUser;
    // console.log(user)
    // var abc = users.child(user.id.toString()).push()
    // abc.set(state)
    // users.child(user.id.toString()).set({
    //     state
    // });  
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
            <h4>Email</h4>
            <input
            value = {this.state.email}
            name = 'email'
            onChange = {this.onChange}            
            placeholder = 'email'
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
            <h4>Name</h4>
            <input
            value = {this.state.name}
            name = 'name'
            onChange = {this.onChange}            
            placeholder = 'Password'
            />
          </div>     
          <div className="form-group">
            <h4>Country</h4>
            <input
            value = {this.state.country}
            name = 'country'
            onChange = {this.onChange}            
            placeholder = 'USA'
            />
          </div>
           <div className="form-group">
            <h4>City</h4>
            <input
            value = {this.state.city}
            name = 'city'
            onChange = {this.onChange}            
            placeholder = 'New York'
            />
          </div>          

          <button className="submit">Зарегистрироваться</button>

        </form>

		)
	}
}

export default Login