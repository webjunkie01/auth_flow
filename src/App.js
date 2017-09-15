import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route } from 'react-router'

// import Login from './login/';
// import Signup from './signup/'
// import Dashboard from './dashboard/'
import MainMenu from './menu/'
import MainContent from './MainContent';
//import { Link } from "react-router-dom";


const App = props =>
 (
      <div className="App">
        <h2>Neverdie Wallet.</h2>
        <MainMenu />
        <MainContent store={props.store}/>
      </div>
    )



App.propTypes = {
  store: PropTypes.object,
}

export default App

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/new-account">New Account</Link></li>
//             <li><Link to="/login">Log in</Link></li>
//           </ul>
//         </div>
//         <Main />

//       </div>
//     );
//   }
// }

//export default App;
