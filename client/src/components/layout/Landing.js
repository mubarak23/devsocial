import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='lading-inner'>
          <h1 className='x-large'>Developer Social</h1>
          <p className='lead'>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className='buttons'>
            <Link to='/register'>Sign up</Link>

            <Link to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
