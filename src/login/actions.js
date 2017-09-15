import {
  LOGIN_REQUESTING,
  LOGIN_OUT
} from './constants'


export function loginRequest  ({ username, password, fullname,  fid, profile_picture }) {
    console.log(fullname, fid)
    console.log("username and pass", username, password)
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

