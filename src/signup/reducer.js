import {
    SIGNUP_REQUESTING,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,} from './constants'

const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
}

const reducer = function signupReducer(state = initialState, action) {

    switch(action.type) {
        case SIGNUP_REQUESTING:

            return {
                requesting: true,
                successful: false,
                messages: [{ body: 'Creating account..', time: new Date() }],
                errors: [],
            }
        case SIGNUP_SUCCESS:
            console.log('success!', action.response.email)

            return {
                errors: [],
                messages: [{
                body: `Account created successfuly for ${action.response.email}`,
                time: new Date()
                }],
                requesting: false,
                successful: true,
            }
        case SIGNUP_ERROR:
            console.log("error!!!", state)
            return {
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date()
                }]),
                messages: [],
                requesting: false,
                successful: false,

            }
        default:
            return state
    }
}

export default reducer