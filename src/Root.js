import React, { Component } from 'react';
import HomeView from './views/home/HomeView';

export default class Root extends Component {

	render() {
		return (
			<div className="container">
				<HomeView />
			</div>
		);
	}
}
