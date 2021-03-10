import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Events from './components/events';
import Login from './components/login';
import Landing from './components/landing';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page">
              <Login />
            </Route>
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

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
