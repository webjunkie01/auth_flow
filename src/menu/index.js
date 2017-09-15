import React,{Component} from 'react'

import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

class MainMenu extends Component {
     static propTypes = {
        logged: PropTypes.bool,
     }

      render() {

        const {logged } = this.props
        console.log( "fucking logged?",logged)
        return (
               <div>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signup">New Account</Link></li>
                    {logged && <li><Link to="/logout">Log out</Link></li>}
                    {!logged && <li><Link to="/login">Log in</Link></li>}
                  </ul>
            </div>
            )

    }
}

const formed = reduxForm({
    form: 'menu',
})(MainMenu)

const connected = connect(
        state => ({
            logged: state.menu.logged
        }),

          )(formed)

export default connected