import React, { Component } from 'react';
import { render } from 'react-dom';
import MainMap from '../src/components/Map/MainMap';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MainLayout from '../src/components/Layouts/MainLayout';
import CreateEventLayout from '../src/components/Layouts/CreateEventLayout';
import SearchEvent from '../src/components/Event/Search';
import CreateEvent from '../src/components/Event/MainCreate';
import SingleEvent from '../src/components/Event/MainSingle';
import Profile from '../src/components/Event/Profile';
import Login from '../src/components/Event/Login';

    

class Main extends Component {

    render() {
      return (
        <Router history={browserHistory}>
          <Route path="/" component={MainLayout}>
            <IndexRoute component={SearchEvent} />
          </Route>
          <Route path="/create" component={CreateEvent} />
          <Route path="/single/:id" component={SingleEvent} />
          <Route path="/profile" component={Profile}/>   
          <Route path="/login" component={Login}/>         
        </Router>
      );
    }
}
render (<Main/>, window.document.getElementById('app'))

