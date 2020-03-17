import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Routes from './components/routing/routes';

import './App.css';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' components={Landing} />
            <Route component={Routes} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
