import {SIGNUP_REQUESTING} from './constants'

const signupRequest = function signupRequest({fullname, email, password}) {
    return {
        type: SIGNUP_REQUESTING,
        fullname,
        email,
        password,
    }
}

export default signupRequest