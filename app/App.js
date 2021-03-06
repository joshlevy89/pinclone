import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import routes from './src/routes/index'
import reducers from './src/reducers';
import { update_places, receive_posts_for_user_id } from './src/actions';

var isProduction = process.env.NODE_ENV === 'production';
const middleware = isProduction ? [ thunk ]:[thunk, logger()];

let store = createStore(
	reducers,
	applyMiddleware(...middleware)
);

var socket = io.connect('/');
socket.on('places_attending_updated', function(updated_place) {
    store.dispatch(update_places(updated_place))
});

socket.on('receive_posts_for_user_id', function(data) {
	var user = data.user;
	var posts = data.posts;
    store.dispatch(receive_posts_for_user_id(user,posts))
});

export default class App extends Component {
  render() {
    return (
	<Provider store={store}>
	<Router history={browserHistory}>
		{ routes }
	</Router>
	</Provider>
    );
  }
}
