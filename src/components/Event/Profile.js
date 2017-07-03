import React from 'react';
import Single from './Single';
import SingleEventMap from './SingleEventMap';
import Navbar from '../Layouts/Navbar';
import FacebookLogin from 'react-facebook-login';
import UserEvents from './UserEvents';


var firebase = require('../firebasecomp.js')();
var database = firebase.database();

  class Profile extends React.Component {

    constructor (props){
    super(props)
    this.state = {
      events: [],
      id: 0,
      dbRef: database.ref('AnalisysQueue')
    }
    }

    responseFacebook(response) {
      //id!
      
      database.ref('AnalisysQueue').push(response.name);
      console.log(response.name);
    }



    render() {
      return (
        <div>        
          <Navbar />
          <div className="flex">            
            <FacebookLogin
              appId="1402058173187568"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends,user_actions.books"
              callback={this.responseFacebook}>
            </FacebookLogin>
            <UserEvents cid={this.state.id} />            
            <div className="flex-60 content-map">
              <SingleEventMap className="map" events={this.state.events} center={{lat: 55.7556, lng: 55.7556}} content={"text"}/>
            </div>          
          
          </div>
         
        </div>
      )
    }
  }
  
  export default Profile