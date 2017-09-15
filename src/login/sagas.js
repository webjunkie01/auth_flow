import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'


import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants'

import {MENU_LOGGED,MENU_LOGOUT} from '../menu/constants'

import {CLIENT_LOGOUT} from '../logout/constants'

import {
  setClient,
  unsetClient,
} from '../client/actions'

import {
  CLIENT_UNSET,
} from '../client/constants'

import {setLogged} from '../menu/actions'



const loginUrl = `${process.env.REACT_APP_API_URL}/login`
const loginSocialUrl = `${process.env.REACT_APP_API_URL}/sociallogin`


function loginApi (email, password) {

    const data = new FormData()
    data.append('username', email)
    data.append('password', password)

    return fetch(loginUrl, {
        method: 'POST',
        body: data,
      })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(function(res){
        if (res.status === "error") {
            var error = new Error(res.message)
            error.response = res.message
            throw error
        }
        return res
    })
    .catch((error) => { throw error })
}

function loginSocialApi(fullname, username, fid, profile_picture) {
    const data = new FormData()
    data.append('username', username)
    data.append('fullname', fullname)
    data.append('fid', fid)
    data.append('profile_picture', profile_picture)

    return fetch(loginSocialUrl, {
        method: 'POST',
        body: data,
      })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(function(res){
        if (res.status === "error") {
            var error = new Error(res.message)
            error.response = res.message
            throw error
        }
        return res
    })
    .catch((error) => { throw error })
}

function* logout () {
    yield put(unsetClient())
    //yield put({ type: CLIENT_LOGOUT })
    yield put({ type: MENU_LOGOUT })
    //yield put({ type: CLIENT_UNSET })
    localStorage.removeItem('token')
}

function* loginFlow (username, password, fullname,  fid, profile_picture) {
    let token
    try {
        console.log("Fullname", fullname)
        if (typeof fullname !== "undefined") {
            token = yield call(loginSocialApi, fullname, username, fid, profile_picture)
        }else{
            token = yield call (loginApi, username, password)
        }
        yield put(setClient(token))
        yield put({type: LOGIN_SUCCESS})
        yield put({type: MENU_LOGGED})
        localStorage.setItem('token', JSON.stringify(token))


    } catch (error) {
        // error? send it to redux
        yield put({ type: LOGIN_ERROR, error })
    } finally {
        // No matter what, if our `forked` `task` was cancelled
        // we will then just redirect them to login
        //yield put({ type: LOGIN_ERROR, error })
    }
    return token
}

function* loginSocial(fullname, username, fid, profile_picture) {
    let token
    try {
        console.log("preparing send request social api")
        token = yield call(loginSocialApi, fullname, username, fid, profile_picture)
        yield put(setClient(token))
        yield put({type: LOGIN_SUCCESS})
        yield put({type: MENU_LOGGED})
        localStorage.setItem('token', JSON.stringify(token))
    } catch (error) {
        // error? send it to redux
        yield put({ type: LOGIN_ERROR, error })
    }
    return token
}

function* loginWatcher () {
    while (true) {

        const { username, password, fullname, fid, profile_picture } = yield take(LOGIN_REQUESTING)
        const task = yield fork(loginFlow, username, password, fullname,  fid, profile_picture)
        const action = yield take([MENU_LOGOUT, LOGIN_ERROR])

        if (action.type === MENU_LOGOUT) {
            yield cancel(task)

        }

        yield call(logout)
    }
}

export default loginWatcher
