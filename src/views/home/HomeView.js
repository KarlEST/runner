import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import Game from '../game/GameView';

import './HomeView.scss';

@autobind
export default class HomeView extends Component {
	
	render() {
		return (
			<div className="container">
				<Game />
			</div>
		);
	}
}