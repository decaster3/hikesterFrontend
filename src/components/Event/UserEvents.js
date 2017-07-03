import React from 'react';
import Single from './Single';
import SingleEventMap from './SingleEventMap';
import Navbar from '../Layouts/Navbar';
import FacebookLogin from 'react-facebook-login';


var firebase = require('../firebasecomp.js')();
var database = firebase.database().ref('Events');
var result = [];
class UserEvents extends React.Component {

	constructor (props){
	super(props)
	this.state = {
	  events: []      
	}
}


componentWillMount() {
  
  var cid = this.props.cid;
  var search = database;
  var t = this;
  var result = [];
  search.orderByChild('creator_id').equalTo(cid).once('value', function(snap){  
  	var input = snap.val();  	
  	

  	for (var type in input) {  
  		result.push(input[type]);
	}  
	
	t.setState({events: result});
});


}




render() {
	
      return (
      		<div>      			
      			{this.state.events.map((event)=>
      				<div>{event.name}</div>      				
      			)}
      		</div>
      	)
  }

}

export default UserEvents