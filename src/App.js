import './App.scss';
import Dashboard from './components/containers/dashboard.container';
import UserDetails from './components/containers/uniqueUser.container';
import { Provider } from "react-redux";
import store from "./store/store";
import React from 'react';
import {  BrowserRouter as Router , Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/details/:id">
            <Provider store={store}>
              <UserDetails />
            </Provider>
          </Route>
          <Route path="/">
            <Provider store={store}>
              <Dashboard />
            </Provider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;