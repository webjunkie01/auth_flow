
import { call, put,  takeEvery, takeLatest } from 'redux-saga/effects'

import {handleApiErrors} from '../lib/api-errors'
import {
    SIGNUP_REQUESTING,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR
} from './constants'

const signupURL = `${process.env.REACT_APP_API_URL}/createaccount`


function signupApi(name,email,password) {

    // const api = createApi("");
    const data = new FormData()
    data.append('fullname', name)
    data.append('email', email)
    data.append('password', password)

    // api.post('/createaccount',data)
    // .then(handleApiErrors)
    // .then(
    //     function(response) {
    //         if (response.data.id === 1) {
    //             console.log('request successful from api')
    //             return response.data
    //         }

    //     }
    // )
    // //.then(json => json)
    // .catch((error) => {throw error})

    return fetch(signupURL, {
        method: 'POST',
        // headers: {

        //     'Content-Type': 'application/json',
        // },

        body: data//JSON.stringify({name, email, password})
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
        //json => json)
    .catch((error) => {throw error})
}

function* signupFlow (action) {
    try {

        const {fullname,email,password} = action
        const response = yield call(signupApi, fullname, email, password)
        yield put({ type: SIGNUP_SUCCESS, response })
    } catch(error){
        yield put({type: SIGNUP_ERROR, error})
    }
}

function* signupWatcher() {
    yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher

