import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/user'
import User from './User'

const Users = ({ getUsers, user: {users, loading} }) => {
  useEffect(() => {
    getUsers();
  }, [])

  return (
    <Fragment>
      <ul>
        {users.map((user) =>
          <User key={user.id}
                    user={user} />
        )}
      </ul>
    </Fragment>
  )
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStatetoProps = state => ({
  user: state.user
})

export default connect(mapStatetoProps, { getUsers })(Users);