import React, { Component } from 'react';
import logo from './logo.svg';
import { proxy } from "./Proxy";
import './App.css';
import { Login } from './Login';
import { Main } from './Main';

export default class App extends Component {
	state = { showLogin: true };

	componentDidMount() {
		proxy.addEventListener("login", () =>
			this.setState({ showLogin: false })
		);
	}

	render() {
		return (
			<div className="app">
				{ this.state.showLogin ? <Login /> : <Main /> }
			</div>
		);
	}
}
