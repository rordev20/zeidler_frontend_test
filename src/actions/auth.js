import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types'

import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/auth/user')
    dispatch({
      type: USER_LOADED,
      payload: res.data.data
    })

  } catch(err) {
    dispatch({
      type: AUTH_ERROR
    })

  }

}

// Register User
export const register = ({first_name, last_name, age, gender, country_id, email, password}) => async dispatch => {
  const config = {
    headers: {
       'Content-Type': 'application/json'
    }
  }

  const body = {user: {first_name, last_name, age, gender, country_id, email, password}}

  try {
    const res = await axios.post('/api/v1/users', body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

  } catch(err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login User

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
       'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({email, password})

  try {
    const res = await axios.post('api/v1/auth/login', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data
    })
    dispatch(loadUser());

  } catch(err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}


// logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  })
}