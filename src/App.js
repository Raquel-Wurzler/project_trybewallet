import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Carteira from './pages/Carteira';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Carteira } />
      </Switch>
    );
  }
}

export default App;
