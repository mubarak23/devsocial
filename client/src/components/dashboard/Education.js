import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Education = ({ education }) => {
  const educations = education.map(edu => (
    <tr key={edu.key}>
      <td>{edu.school}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Education Credential</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Year</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};
Education.propTypes = {
  education: PropTypes.array.isRequired
};

export default Education;
