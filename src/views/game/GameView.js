import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import { scale } from '../../config/constants';

import './GameView.scss';

@autobind
export default class GameView extends Component {

	static propTypes = {
		level: React.PropTypes.object.isRequired,
	};

	state = {
		test: 'test',
	};

	render() {
		this.level = this.props.level;
		this.actorLayer = null;
		console.log('status: ', this.level.status);
		return (
			<div className={"game "+(this.level.status || '')}>
				{this.renderBackground(this.level)}
				{this.renderFrame(this.level)}

			</div>
		)
	}

	renderBackground(level) {
		return(
			<div className="background">
				{level.planGrid.map(row => this.renderBackgroundRow(row))}
			</div>
		);
	}

	renderBackgroundRow(row) {
		// TODO key for div-s
		return(
			<div className="row" key={Math.random()}>
				{row.map(type => this.renderBackgroundType(type))}
			</div>
		);
	}

	renderBackgroundType(type) {
		const classname = type ? "type " + type : "type";
		return(
			<div className={classname} key={Math.random()} />
		);
	}

	renderFrame(level) {
		if (this.actorLayer) {

		}
		return this.renderActors(level);
	}

	renderActors(level) {

		return (
			<div className="actors">
				{level.actors.map(actor => this.renderActor(actor))}
			</div>
		);
	}

	renderActor(actor) {
		const divStyle = {
			width: actor.size.x * scale,
			height: actor.size.y * scale,
			left: actor.position.x * scale,
			top: actor.position.y * scale,
		};

		return (
			<div className={"actor "+actor.type} key={Math.random()} style={divStyle} />
		);
	}
}