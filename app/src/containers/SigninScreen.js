import React, { Component } from 'react';
import { connect } from 'react-redux'
import TwitterAuthentication from './TwitterAuthentication'
import { check_login_status, signin, receive_results } from '../actions'
import { Link } from 'react-router'
require('../../styles/index.scss')
require('../../styles/SigninScreen.scss')
import { get_posts_by_user_id } from '../actions'


class LoginScreen extends Component {

  constructor(props) {
    super(props);
    // todo: replace this mock posts fetch with fetch for the 
    // authenticated user (or for another user's page for 
    // unauthenticated user)
   // const {dispatch} = this.props
   // dispatch(get_posts_by_user_id(0));
  }

  render() {
    
      const { user_name, dispatch } = this.props
      // if twitter authentication changes user name, dispatch signin
      const urlUsername = this.props.params.urlUsername
      // change user_name if the urlUsername is a) not undefined and b) does
      // not equal the current user_name
      if (urlUsername !== undefined) {
        if (urlUsername !== user_name) {
         dispatch(signin(urlUsername))
         // get the last search from local storage
         var results = JSON.parse(sessionStorage.getItem("results"));
         if (results !== null) { // as in no search has yet been executed
         dispatch(receive_results(results))
         }
        }
    }
    return (
      <div className="mainLayout">
      {/* twitter authentication button */}
      <TwitterAuthentication/>
      <div className="barsLink"><Link to='/search'>Search for friends</Link></div>
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
