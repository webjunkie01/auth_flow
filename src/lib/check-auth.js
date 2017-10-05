
import PropTypes from 'prop-types';


import { setClient } from '../client/actions'
import {setLogged} from '../menu/actions'

function checkAuthorization (dispatch) {
  // attempt to grab the token from localstorage
  const storedToken = localStorage.getItem('token')

  if (storedToken) {
    const token = JSON.parse(storedToken)
    const createdDate = new Date(token.created)
    const created = Math.round(createdDate.getTime() / 1000)
    const ttl = 1209600
    const expiry = created + ttl

    if (created > expiry) return false
    dispatch(setClient(token))
    return true
  }

  return false
}

export default checkAuthorization

