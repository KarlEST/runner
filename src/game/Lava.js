import Position from './Position';
import { step } from '../config/constants';

export default class Lava {

	constructor(position, ch) {
		this.position = position;
		this.size = new Position(1, 1);
		if (ch === '=') {
			this.speed = new Position(2, 0);
		} else if (ch === '|') {
			this.speed = new Position(0, 2);
		} else if (ch === 'v') {
			this.speed = new Position(0, 3);
			this.repeatPos = position;
		}
		this.type = 'lava';
	}

	act(level) {
		const newPosition = this.position.plus(this.speed.x * step, this.speed.y * step);
		if (!level.obstacleAt(newPosition, this.size)) {
			this.position = newPosition;
		} else if (this.repeatPos) {
			this.position = this.repeatPos;
		} else {
			this.speed = this.speed.times(-1);
		}
	}
}