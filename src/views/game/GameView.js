// TODO structure code
// TODO create level from level string
// TODO lint this ugly code
// TODO BUG: fix jumping(can jump from atop of coin).
// TODO BUG: In chrome you can jump to the wall and keep staying on the wall
// if press the key in the same direction as wall

import React, { Component } from 'react';
import '../../game/game';

export default class GameView extends Component {
	render() {
		return (
			<div className="game" />
		);
	}
}