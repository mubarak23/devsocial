import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from '../auth/Login';
import Alert from '../components/layout/Alert';
import { Provider } from 'react-redux';
import createProfile from '../components/profile-forms/createProfile';
import editProfile from '../components/profile-forms/EditProfile';
import AddExperience from '../components/profile-forms/AddExperience';
import AddEducation from '../components/profile-forms/AddEducation';
import Profiles from '../components/profiles/Profiles';
import Profile from '../components/profiles/Profile';
import Posts from '../components/posts/Posts';
import Post from '../components/posts/Post';
import Dashboard from '../components/dashboard/Dashboard';
import PrivateRoute from '../components/routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/profiles' component={Profiles} />
        <Route path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={createProfile} />
        <PrivateRoute exact path='/edit-profile' component={editProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        >
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
      </Switch>
    </section>
  );
};

export default Routes;
