import React,{Component} from 'react';

import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import loginRequest from './actions'

import { Route, Redirect } from 'react-router'

import {reset} from 'redux-form';


class Login extends Component{

      static propTypes = {
        handleSubmit: PropTypes.func,
        loginRequest: PropTypes.func,
        login: PropTypes.shape({
          requesting: PropTypes.bool,
          successful: PropTypes.bool,
          messages: PropTypes.array,
          errors: PropTypes.array,
          redirect: PropTypes.string,
        }),
      }

    render () {
       const {
         handleSubmit,
         login: { requesting, successful, messages, errors, redirectTo},
         pristine,
         submitting,

       } = this.props

       return (
        <div>
        {successful && <Redirect to={redirectTo} push />}
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <Field
                name="username"
                type="text"
                id="username"
                component="input"
                />
                <label>Password</label>
                <Field
                name="password"
                type="password"
                id="password"
                component="input"
                />
             <button action="submit" disabled={pristine || submitting}>Login</button>
            </form>
            <div className="auth-messages">
                      {/* As in the signup, we're just using the message and error helpers */}
                      {!requesting && !!errors.length && (
                        <Errors message="Failure to login due to:" errors={errors} />
                      )}
                      {!requesting && !!messages.length && (
                        <Messages messages={messages} />
                      )}
                      {requesting && <div>Logging in...</div>}
                      {!requesting && !successful && (
                        <Link to="/signup">Need to Signup? Click Here »</Link>
                      )}
            </div>
        </div>
        )
    }
}

const formed = reduxForm({
    form: 'login',
})(Login)

const connected = connect(
        state => ({
            login: state.login
        }),
          dispatch => ({
            onSubmit: data => dispatch(loginRequest(data)),
            onSubmitSuccess: (result, dispatch, props) => {
                props.reset()
            }
          })
          )(formed)

export default connected
