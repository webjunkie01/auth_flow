import {CLIENT_LOGOUT} from './constants'

const initialState = {
    logout: false,

}

const reducer = function clientReducer(state = initialState, action ) {
    switch(action.type) {
        case CLIENT_LOGOUT:
            return {
                logout: true,

            }
        default:
            return state
    }
}

export default reducer