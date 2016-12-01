import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import GameHandler from '../game/GameHandlerView';

import './HomeView.scss';

@autobind
export default class HomeView extends Component {

	render() {
		return (
			<div className="container">
				<GameHandler />
			</div>
		);
	}
}