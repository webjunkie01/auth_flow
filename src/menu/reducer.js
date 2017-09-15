import {MENU_LOGGED, MENU_LOGOUT} from './constants'

const initialState = {
    logged: false,
}

const reducer = function menuReducer(state = initialState, action ) {
    switch(action.type) {
        case MENU_LOGGED:
        console.log("update state to logged true!!!!")
            return {
                logged: true,
            }
        case MENU_LOGOUT:
        console.log("update menu state logged false and log out!!!")
            return {
                logged: false,
            }
        default:
            return state
    }
}

export default reducer