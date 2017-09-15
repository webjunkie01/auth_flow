import {MENU_LOGGED, MENU_LOGOUT} from './constants'

export function setLogged() {
    return {
        type: MENU_LOGGED,

    }
}

export function menusetLogout() {
    return {
        type: MENU_LOGOUT,

    }
}


