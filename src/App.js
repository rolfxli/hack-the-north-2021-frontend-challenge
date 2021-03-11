import './App.css';
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Events from './components/events';
import Landing from './components/landing';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
          <Switch>
            <Route exact path="/events" name="Events Page">
              <Events />
            </Route>
            <Route path="/" name="Landing Page">
              <Landing />
            </Route>
          </Switch>
      </HashRouter>
    );
  }
}

export default App;
