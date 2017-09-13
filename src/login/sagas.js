import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'


import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants'

import {
  setClient,
  unsetClient,
} from '../client/actions'

import {
  CLIENT_UNSET,
} from '../client/constants'


const loginUrl = `${process.env.REACT_APP_API_URL}/login`



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

function* logout () {
    yield put(unsetClient())
    localStorage.removeItem('token')
}

function* loginFlow (username, password) {
    let token
    try {
        token = yield call (loginApi, username, password)
        yield put(setClient(token))
        yield put({ type: LOGIN_SUCCESS })
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

function* loginWatcher () {
    while (true) {
        const { username, password } = yield take(LOGIN_REQUESTING)
        const task = yield fork(loginFlow, username, password)
        const action = yield take([CLIENT_UNSET, LOGIN_ERROR])
        if (action.type === CLIENT_UNSET) yield cancel(task)
        yield call(logout)
    }
}

export default loginWatcher
