import axios from 'axios';
import {
  GET_USERS,
  USERS_ERROR
} from './types'

// get current user profile
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('api/v1/users');
    dispatch({
      type: GET_USERS,
      payload: res.data.data
    })
  } catch(err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })

  }

}