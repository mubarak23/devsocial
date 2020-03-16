import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import { Provider } from 'react-redux';
import createProfile from '../profile-forms/createProfile';
import editProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profiles/Profile';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import AddPost from '../posts/PostForm';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';

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
        <PrivateRoute exact path='/add-post' component={AddPost} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
      </Switch>
    </section>
  );
};

export default Routes;
