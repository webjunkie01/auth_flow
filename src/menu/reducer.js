
import {LOGIN_SUCCESS, LOGIN_OUT} from '../login/constants'

const initialState = {
    logged: false,
}

const reducer = function menuReducer(state = initialState, action ) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                logged: true,
            }
        case LOGIN_OUT:
            return {
                logged: false,
            }
        default:
            return state
    }
}

export default reducer