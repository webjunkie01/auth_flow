import React,{Component} from 'react';

import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import logoutRequest from './actions'
import {menusetLogout} from '../menu/actions'
import {loginOut} from '../login/actions'


class LogOut extends Component {
    static propTypes = {
         logout: PropTypes.object,
     }

    componentWillMount() {
        this.props.dispatch(logoutRequest())
        this.props.dispatch(menusetLogout())
        this.props.dispatch(loginOut())

    }
    render() {
        const {logout } = this.props.logout
        console.log( "fucking logout?",this.props.logout)
        console.log(logout)
        return (
            <div>
            {logout && <Redirect to='/' push />}
            </div>)
    }


}

const formed = reduxForm({
    form: 'logout',
})(LogOut)

const connected = connect(
        state => ({
            logout: state.logout
        }),

          )(formed)

export default connected



