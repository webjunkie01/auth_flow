import React,{Component} from 'react'
import {Route, Redirect } from 'react-router'
import checkAuthorization from './check-auth'

const PrivateRoute = ({ component: Component, ...rest, store: store } ) => (

  <Route {...rest} render={function (props) {
      const client = store.getState().client
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