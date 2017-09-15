import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import client from './client/reducer'
import signup from './signup/reducer'
import login from './login/reducer'
import menu from './menu/reducer'
import logout from './logout/reducer'

const IndexReducer = combineReducers({
    logout,
    menu,
    login,
    signup,
    client,
    form,
})

export default IndexReducer