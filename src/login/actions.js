import {
  LOGIN_REQUESTING,
  LOGIN_OUT
} from './constants'


export function loginRequest  ({ username, password, fullname,  fid, profile_picture }) {
  return {
    type: LOGIN_REQUESTING,
    username,
    password,
    fullname,
    fid,
    profile_picture
  }
}

export function loginOut () {
    return {
        type: LOGIN_OUT,

    }
}

