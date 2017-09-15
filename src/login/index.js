import React,{Component} from 'react';

import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import {loginRequest} from './actions'

import { Route, Redirect } from 'react-router'

import {reset} from 'redux-form';




import FacebookLogin from './facebook';


class Login extends Component{
    // If you were testing, you'd want to export this component
    // so that you can test your custom made component and not
    // test whether or not Redux and Redux Form are doing their jobs
    // Pass the correct proptypes in for validation
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

      constructor() {
        super()
        let selfprops = this
      }


    responseFacebook = (response) => {
          let fullname = response.name
          let profile_picture = response.picture.data.url
          let email = response.email
          let fid = response.id
          this.props.dispatch(loginRequest({"username": email, password: '',fullname: fullname, fid: fid, profile_picture: profile_picture}))
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
          {successful && <Redirect to={redirectTo} />}
            <FacebookLogin
                      appId="1879906398691946"
                      autoLoad={false}
                      fields="name,email,picture"
                      scope="public_profile,email"
                      callback={this.responseFacebook}
                    />
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
            // reduxForm() expects the component to have an onSubmit
            // prop. You could also pass this from a parent component.
            // I want to dispatch a redux action.
            onSubmit: data => dispatch(loginRequest(data)),

          })
          )(formed)

export default connected
