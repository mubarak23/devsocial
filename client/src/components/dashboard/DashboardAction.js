import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='button'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i class='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/add-exprecience' className='btn btn-light'>
        <i class='fab fa-black-tie text-primary' /> Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <i class='fas fa-graduation-cap text-primary' /> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
