import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_OUT,
    LOGIN_SOCIAL,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  redirectTo: '',
}

const reducer = function loginReducer(state = initialState, action) {
    switch (action.type) {
        // Set the requesting flag and append a message to be shown
        case LOGIN_REQUESTING:
          return {
            requesting: true,
            successful: false,
            messages: [{ body: 'Logging in', time: new Date() }],
            errors: [],
            redirectTo: '',
          }
        // Successful?  Reset the login state.
        case LOGIN_SUCCESS:
          return {
            errors: [],
            messages: [],
            requesting: false,
            successful: true,
            redirectTo: '/dashboard',
          }

        // Append the error returned from our api
        // set the success and requesting flags to false
        case LOGIN_ERROR:
          return {
            errors: state.errors.concat([{
              body: action.error.toString(),
              time: new Date(),
            }]),
            messages: [],
            requesting: false,
            successful: false,
            redirectTo: '',
          }
        case LOGIN_OUT:
          return {
            errors: [],
            messages: [],
            requesting: false,
            successful: false,
            redirectTo: '',
          }

        default:
          return state
    }


}

export default reducer