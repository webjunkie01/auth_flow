import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route } from 'react-router'
import MainContent from './MainContent';



const App = props =>
 (
      <div className="App">
        <h2>Welcome.</h2>
        <MainContent store={props.store}/>
      </div>
  )


App.propTypes = {
  store: PropTypes.object,
}

export default App

