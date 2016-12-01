import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import { scale } from '../../config/constants';
import { levels, test } from '../../config/levels';
import Level from '../../game/Level';

import Actors from '../../game/Actors';

import './GameView.scss';

@autobind
export default class GameView extends Component {

	state = {
		level: 0,
	};

	render() {
		const gameLevel = new Level({
			plan: levels[this.state.level] || test,
		});
		this.level = gameLevel;
		this.actorLayer = null;
		const classname = classnames('game', { lost: gameLevel.status === 'lost' });
		// this.scrollPlayerIntoView();


		return (
			<div className={classname}>
				{this.renderBackground(gameLevel)}
				<Actors level={gameLevel} andThen={this.handleFunc} scroll={this.scrollPlayerIntoView} />
			</div>
		);
	}

	renderBackground(level) {
		return (
			<table className="background" style={{ width: scale * this.level.width }}>
				<tbody>
					{level.planGrid.map(row => this.renderBackgroundRow(row))}
				</tbody>
			</table>
		);
	}

	renderBackgroundRow(row) {
		// TODO key for div-s
		return (
			<tr className="row" key={Math.random()}>
				{row.map(type => this.renderBackgroundType(type))}
			</tr>
		);
	}

	renderBackgroundType(type) {
		return (
			<td className={type ? `type ${type}` : 'type'} key={Math.random()} />
		);
	}


	handleFunc(status) {
		if (status === 'lost') { // TODO forceupdate and setstate console warning
			this.forceUpdate();
		} else {
			this.setState({ level: this.state.level + 1 });
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