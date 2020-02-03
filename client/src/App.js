import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

const App = () => (
  <div>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' components={Landing} />
        <section className='container'>
          <Switch>
            <Route path='/register' components={Register} />
            <Route path='/login' components={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </div>
);

export default App;
