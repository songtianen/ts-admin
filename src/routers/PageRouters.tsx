import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom';
import MyLayout from '../views/layout/Layout';

const Routers = () => (
  <Router>
    <Switch>
      <Route path='/' component={MyLayout} />
    </Switch>
  </Router>
);

export default Routers;
