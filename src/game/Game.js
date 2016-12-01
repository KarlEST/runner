import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import classnames from 'classnames';

import Background from './Background';
import Actors from './Actors';

@autobind
export default class Game extends Component {

	static propTypes = {
		level: PropTypes.object.isRequired,
		handleLevel: PropTypes.func.isRequired,
		scroll: PropTypes.func.isRequired,
	};

	render() {
		this.actorLayer = null;
		const classname = classnames('game', {
			lost: this.props.level.status === 'lost',
		});

		return (
			<div className={classname}>
				<Background level={this.props.level} />
				<Actors level={this.props.level} handleLevel={this.props.handleLevel} scroll={this.props.scroll} />
			</div>
		);
	}
}