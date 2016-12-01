import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import classnames from 'classnames';

import Level from '../../game/Level';
import Game from '../../game/Game';
import { scale } from '../../config/constants';
import { levels, test } from '../../config/levels';

import './GameHandlerView.scss';

@autobind
export default class GameHandlerView extends Component {

	state = {
		level: 0,
	};

	render() {
		const gameLevel = new Level({
			plan: levels[this.state.level] || test,
		});
		const classname = classnames('gameContainer', {
			lost: gameLevel.status === 'lost',
			won: gameLevel.status === 'won',
		});
		this.level = gameLevel;
		this.actorLayer = null;

		return (
			<div className={classname}>
				<Game level={gameLevel} handleLevel={this.handleLevel} scroll={this.scrollPlayerIntoView} />
			</div>
		);
	}

	handleLevel(status) {
		if (status === 'lost') { // TODO forceupdate and setstate console warning
			this.forceUpdate();
		} else if (this.state.level + 1 <= levels.length) {
			this.setState({ level: this.state.level + 1 });
			// this.forceUpdate();
		}
	}

	scrollPlayerIntoView() {
		this.wrap = document.getElementsByClassName('game')[0];
		if (!this.wrap) {
			return;
		}
		const width = this.wrap.clientWidth;
		const height = this.wrap.clientHeight;
		const margin = width / 3;

		// The viewport
		const left = this.wrap.scrollLeft;
		const right = left + width;
		const top = this.wrap.scrollTop;
		const bottom = top + height;

		const player = this.level.player;
		const center = player.position.plus(player.size.x * 0.5, player.size.y * 0.5).times(scale);

		if (center.x < left + margin) {
			this.wrap.scrollLeft = center.x - margin;
		} else if (center.x > right - margin) {
			this.wrap.scrollLeft = center.x + margin - width;
		}
		if (center.y < top + margin) {
			this.wrap.scrollTop = center.y - margin;
		} else if (center.y > bottom - margin) {
			this.wrap.scrollTop = center.y + margin - height;
		}
	}
}