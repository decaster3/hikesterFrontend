import React from 'react';
import style from './form.scss';
import Tags from './Tags';

var firebase = require('../firebasecomp.js')();
var database = firebase.database().ref('events');
var t = {}
class Single extends React.Component {

  constructor(props) {
    super(props);

    this.state = {      
      type: [],
      showJoinButton: true,
      people_count: 0
    };

    this.updateInfo = this.updateInfo.bind(this)
    
  }

  


  componentWillMount() {
   
     database.child(this.props.id).once('value', this.updateInfo)     
    
  }



  updateInfo(snapshot){
      var newEvent = snapshot.val();           
      var showJoinButton = true      
      
      var users = newEvent.participants
      Object.keys(users).forEach(function(key){
        if(key === firebase.auth().currentUser.uid)
        {
          showJoinButton = false;
        }
      });
      console.log(users)
      this.state = newEvent
      this.state.showJoinButton = showJoinButton
      this.forceUpdate()

      console.log(this.state)
  }

  componentDidMount(){
       
  }

  joinHandler(e) {
    var url = database.child(this.state.event_id + '/users');

    var data = {'profile_id': 1}; 

    var id = this.state.event_id;

       

    console.log(data);

    var push = url.push();

    push.set(data);
      
      var push2 =  database.child(this.state.event_id + '/people_count');      
      var people_count = (parseInt(this.state.people_count) + 1).toString();
      push2.set(people_count);
      this.setState({people_count: people_count})
      this.state.showJoinButton = false;
     
  }

  render() {

    return (
      <div className="flex-40 content-form events-create">
        <div className="filters">
          <div className="form-group">
            <h3>{this.state.name}</h3>
          </div>
          <div className="form-group">
            <h4>Описание</h4>
            <div className="description">
              {this.state.description}
            </div>
          </div>          
          <div className="form-group">
            <h4>Кол-во участников</h4>
            <div className="description">
              {this.state.people_count}
            </div>
          </div>
          <div className="tag-filter">
            <h4>Тэги события</h4>
            <Tags tags={this.state.type} isClickable={false}/>
          </div>
          { this.state.showJoinButton == true ?
              <button className="button submit" data-id={this.state.id} onClick={this.joinHandler.bind(this)}>Присоединиться</button>
              :
              <div>Вы присоединились к данному событию</div>
          }

        </div>
      </div>
    );
  }

}

export default Single;
