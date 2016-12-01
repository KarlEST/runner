import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';

import { scale } from '../config/constants';

@autobind
export default class Background extends Component {

	static propTypes = {
		level: PropTypes.object.isRequired,
	};

	render() {
		return (
			<table className="background" style={{ width: scale * this.props.level.width }}>
				<tbody>
					{this.props.level.planGrid.map(row => this.renderBackgroundRow(row))}
				</tbody>
			</table>
		);
	}

	renderBackgroundRow(row) {
		// TODO key update
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
}