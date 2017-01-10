import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import './HomeView.scss';
import GameView from '../game/GameView';
@autobind
export default class HomeView extends Component {

	render() {
		return (
			<div className="game-container">
				<GameView />
			</div>
		);
	}
}