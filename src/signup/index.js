import React,{Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import signupRequest from './actions'
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'



class Signup extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func,
        signupRequest: PropTypes.func,
        signup: PropTypes.shape({
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
        }),

    }


    render() {
        const {
            handleSubmit,
            signup: {
                requesting, successful, messages, errors
            },
            pristine,
            submitting
        } = this.props
        return (
            <div>
            <form onSubmit={handleSubmit}>
            <label>Fullname</label>
            <Field
                name="fullname"
                type="text"
                id="fullname"
                component="input"
            />
            <label>Email</label>
            <Field
                name="email"
                type="email"
                id="email"
                component="input"
            />
            <label>Password</label>
            <Field
                name="password"
                type="password"
                id="password"
                component="input"
            />
            <button type="submit" disabled={pristine || submitting}>Create account</button>
            </form>

            <div className="auth-messages">
                  {
                    /*
                    These are all nothing more than helpers that will show up
                    based on the UI states, not worth covering in depth.  Simply put
                    if there are messages or errors, we show them
                    */
                  }
                  {!requesting && !!errors.length && (
                    <Errors message="Failure to signup due to:" errors={errors} />
                  )}
                  {!requesting && !!messages.length && (
                    <Messages messages={messages} />
                  )}
                  {!requesting && successful && (
                    <div>
                      Signup Successful! <Link to="/login">Click here to Login »</Link>
                    </div>
                  )}
                  {!requesting && !successful && (
                    <Link to="/login">Already have an account? Login Here »</Link>
                  )}
                </div>
            </div>)
    }

}



const formed = reduxForm({
    form: 'signup',
})(Signup)

const connected = connect(
        state => ({
            signup: state.signup
        }),
          dispatch => ({
            onSubmit: data => dispatch(signupRequest(data))
          })
          )(formed)

export default connected
