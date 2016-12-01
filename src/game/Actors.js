import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import { scale, step } from '../config/constants';

@autobind
export default class GameView extends Component {

	static propTypes = {
		level: PropTypes.object.isRequired,
		andThen: PropTypes.func.isRequired,
		scroll: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.startAnimation();
	}

	componentWillUnmount() {
		// TODO componentWillUnmount
	}

	render() {
		this.level = this.props.level;
		if (this.level.status) {
			this.props.andThen(this.level.status);
		}
		this.props.scroll();

		return (
			<div className="actors">
				{this.renderActors(this.level)}
			</div>
		);
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
			<div className={`actor ${actor.type}`} key={Math.random()} style={divStyle} />
		);
	}

	startAnimation() {
		setInterval(() => { this.forceUpdate(); }, step * 1000);  // TODO window.requestAnimationFrame(callback);
	}
}