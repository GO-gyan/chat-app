import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Layout from './layout/Layout';
import Login from './login/Login';
import Chat from './chat/Chat';

class App extends Component {
	render() {
		return(
			<Router history={hashHistory}>
				<Route path="/" component={Layout}>
					<IndexRoute component={Login}></IndexRoute>
					<Route path="chat" component={Chat}></Route>
				</Route>
			</Router>
			)
	}
}

export default App;