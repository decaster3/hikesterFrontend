import React, { Component } from 'react';
import { render } from 'react-dom';
import MainMap  from '../src/components/Map/MainMap'
import {Router, Route} from 'react-router';
class Main extends Component {

    render(){
        return (
        );
    }
}
render (<Router>
        <Route path="/" component={SearchMain}/>
        <Route path="/create_event" component={CreateMain}/>
        <Route path="/create_event" component={CreateMain}/>
        <Route path="/events" component={ListEvents}/>
        <Route path="/event_join" component={JoinToEvent}/>
    </Router>, window.document.getElementById('app'))
