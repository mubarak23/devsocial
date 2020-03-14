import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <div className='profile-about bg-light p-2'>
    {bio && (
      <Fragment>
        <h2 className='text-primary'> {name.trim().split(' ')[0]}s bio </h2>
        <p>{bio}</p>
      </Fragment>
    )}
    <h2 className='text-primary'>Skill Set</h2>
    <div className='skills'>
      {skills.map((skill, index) => (
        <div className='p-1' key={index}>
          <i className='fas fa-check'>{skill}</i>
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propType = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
