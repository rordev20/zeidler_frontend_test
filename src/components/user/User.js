import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const User = ({user}) => {
  return (
    <Fragment>
      <h1>{user.first_name}</h1>
    </Fragment>
  )
}

export default User;