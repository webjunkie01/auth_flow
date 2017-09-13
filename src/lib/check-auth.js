import React,{Component} from 'react'
import {Route, Redirect } from 'react-router'
import PropTypes from 'prop-types';


import { setClient } from '../client/actions'

function checkAuthorization (dispatch) {
  const storedToken = localStorage.getItem('token')
  if (storedToken) {
    const token = JSON.parse(storedToken)
    const createdDate = new Date(token.created)
    const created = Math.round(createdDate.getTime() / 1000)
    const ttl = 1209600
    const expiry = created + ttl

    if (created > expiry) return false
    dispatch(setClient(token))
    return true
  }

  return false
}



const PrivateRoute = ({ component: Component, ...rest, store: store } ) => (

  <Route {...rest} render={function (props) {
      const client = store.getState().client
      //const storedToken = localStorage.getItem('token')
      if (client && client.token) {
          return <Component {...props}/>
      }

      if ( checkAuthorization(store.dispatch ) ) {
        return <Component {...props}/>
      }
      return <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
      }
    }/>
)



export default PrivateRoute

