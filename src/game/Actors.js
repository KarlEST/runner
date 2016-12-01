import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import { scale, step } from '../config/constants';

@autobind
export default class Actors extends Component {

	static propTypes = {
		level: PropTypes.object.isRequired,
		handleLevel: PropTypes.func.isRequired,
		scroll: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.startAnimation();
	}

	componentWillUnmount() {
		// TODO componentWillUnmount
	}

	render() {
		if (this.props.level.isFinished()) {
			this.props.handleLevel(this.props.level.status);
		}
		this.props.scroll();

		return (
			<div className="actors">
				{this.props.level.actors.map(actor => this.renderActor(actor))}
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
			<div
				className={`actor ${actor.type} ${this.props.level.status || ''}`}
				key={Math.random()}
				style={divStyle}
			/>
		);
	}

	startAnimation() {
		setInterval(() => { this.animate(); }, step * 1000);  // TODO window.requestAnimationFrame(callback);
	}

	animate() {
		this.props.level.actors.map(actor => actor.act(this.props.level, this.props.level.keys));
		if (this.props.level.status !== null) {
			this.props.level.finishDelay -= step;
		}
		this.forceUpdate();
	}
}