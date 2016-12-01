import Position from './Position';
import { step, CoinWobble } from '../config/constants';

export default class Coin {

	constructor(position) {
		this.basePos = this.position = position.plus(0.2, 0.1);
		this.size = new Position(0.6, 0.6);
		this.wobble = Math.random() * Math.PI * 2;
		this.type = 'coin';
	}

	act() {
		this.wobble += step * CoinWobble.speed;
		const wobblePos = Math.sin(this.wobble) * CoinWobble.distance;
		this.position = this.basePos.plus(0, wobblePos);
	}
}