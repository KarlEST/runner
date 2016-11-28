import React, { Component, PropTypes } from 'react';
import HomeView from './views/home/HomeView';

export default class Root extends React.Component {

	render() {
		return (
			<div className="container">
				<HomeView />
			</div>
		);
	}
}
