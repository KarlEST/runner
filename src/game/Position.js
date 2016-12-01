export default class Position {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	plus(x, y) {
		return new Position(this.x + x, this.y + y);
	}

	times(factor) {
		return new Position(this.x * factor, this.y * factor);
	}

}