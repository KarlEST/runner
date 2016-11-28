import Position from './Position';


export default class Lava{

	constructor(position, ch) {
		this.position = position;
		this.size = new Position(1, 1);
		if (ch === "=") {
			this.speed = new Position(2, 0);
		} else if (ch === "|") {
			this.speed = new Position(0, 2);
		} else if (ch === "v") {
			this.speed = new Position(0, 3);
			this.repeatPos = position;
		}
		this.type = 'lava';
	}

	toString() {
		return 'Player position: ' + this.position + ' and size: ' + this.size + ' and speed: ' + this.speed;
	}
}