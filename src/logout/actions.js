// import {
//   CLIENT_UNSET,
// } from '../logout/constants'
import {
  CLIENT_LOGOUT,
} from './constants'

const logoutRequest = function logoutRequest () {
  return {
    type: CLIENT_LOGOUT,

  }
}

export default logoutRequest