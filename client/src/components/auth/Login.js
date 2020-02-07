import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.name });
  };
  const onSubmit = async event => {
    event.preventDefault();
    //console.log('success');
    login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div>
      <Fragment>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'>Sign into Your Account</i>
        </p>
        <form className='form' onSubmit={event => onSubmit(event)}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={event => onChange(event)}
              required
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Account Password'
              name='password'
              value={password}
              onChange={event => onChange(event)}
              required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't Have an Account <Link to='/register'>Sign up</Link>
        </p>
      </Fragment>
    </div>
  );
};

//export default Login;
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
