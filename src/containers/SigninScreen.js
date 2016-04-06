import React, { Component } from 'react';
import { connect } from 'react-redux'
import TwitterAuthentication from './TwitterAuthentication'
import { signin } from '../actions'
import { Link } from 'react-router'
require('../styles/index.scss')
require('../styles/SigninScreen.scss')

class LoginScreen extends Component {

  // handleInputChange(key,val) {
  //   const { dispatch } = this.props
  //   if (key === 13) {
  //     dispatch(signin(val))
  //   }
  // }

  render() {
      const { user_name, dispatch } = this.props
      // if twitter authentication changes user name, dispatch signin
      const urlUsername = this.props.params.urlUsername
      // change user_name if the urlUsername is a) not undefined and b) does
      // not equal the current user_name
      if (urlUsername !== undefined) {
        if (urlUsername !== user_name) {
         dispatch(signin(urlUsername))
        }
    }

    return (
      <div className="mainLayout">
      {/* minimalist sign-in 
      user name: <input ref = 'username_input' 
      onKeyUp = {e=>this.handleInputChange(e.keyCode,this.refs.username_input.value)}/>
      */}
      {/* twitter authentication button */}
      <TwitterAuthentication/>
      <div className="barsLink"><Link to='/search'>Find local bars</Link></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_name: state.user_info.user_name
  }
}

LoginScreen = connect(
mapStateToProps
)(LoginScreen)

export default LoginScreen