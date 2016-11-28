import Position from './Position';


export default class Player{

	constructor(position) {
		this.position = position.plus(0 , -0.5);
		this.size = new Position(0.8, 1.5);
		this.speed = new Position(0, 0);
		this.type = 'player';
	}

	toString() {
		return 'Player position: ' + this.position + ' and size: ' + this.size + ' and speed: ' + this.speed;
	}
}