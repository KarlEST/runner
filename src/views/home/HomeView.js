import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import { level, test } from '../../config/levels';
import Level from '../../game/Level';
import Game from '../game/GameView';

import './HomeView.scss';

@autobind
export default class HomeView extends Component {
	
	render() {
		const levelTest = new Level({
			plan : level[0] || test,
		});

		return (
			<div className="container">
				<Game level={levelTest} />
			</div>
		)
	}
}