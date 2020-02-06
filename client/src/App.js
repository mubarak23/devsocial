import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import { Provider } from 'react-redux';
import store from './store';
import { londUser } from './actions/auth';

import './App.css';

const App = () => (
  <div>
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' components={Landing} />
          <Alert />
          <section className='container'>
            <Switch>
              <Route path='/register' components={Register} />
              <Route path='/login' components={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  </div>
);

export default App;
