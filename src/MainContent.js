import React,{Component} from 'react'
import {Route } from 'react-router'
import PropTypes from 'prop-types';



import Login from './login/';
import Signup from './signup/'
import Dashboard from './dashboard/'

import
  PrivateRoute
 from './lib/check-auth'

const MainContent = props =>

 (
        <div>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute store={props.store} path={"/dashboard"} component={Dashboard} />
        </div>
)

MainContent.propTypes = {
    store: PropTypes.object,
}


export default MainContent