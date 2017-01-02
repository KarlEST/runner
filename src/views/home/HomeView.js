import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import './HomeView.scss';

@autobind
export default class HomeView extends Component {

	render() {
		return (
			<div className="container">
				Hello world
			</div>
		);
	}
}