export default class Position{

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return 'Position x: ' + this.x + ' and y: ' + this.y;
	}

	plus(x, y) { // TODO return new vector?
		return new Position(this.x + x, this.y + y);
		// this.x = this.x + x;
		// this.y = this.y + y;
	}

	times(factor) {
		return new Position(this.x * factor, this.y * factor);
		// this.x = this.x * factor;
		// this.y = this.y * factor;
	}

}