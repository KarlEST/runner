import Position from './Position';


export default class Coin{

	constructor(position) {
		this.basePos = this.position = position.plus(0.2 , 0.1);
		this.size = new Position(0.6, 0.6);
		this.wobble = Math.random() * Math.PI * 2;

		this.type = 'coin';
	}

	toString() {
		return 'Player position: ' + this.position + ' and size: ' + this.size + ' and speed: ' + this.speed;
	}
}