import Position from './Position';
import { step, PlayerMovement } from '../config/constants';

export default class Player {

	constructor(position) {
		this.position = position.plus(0, -0.5);
		this.size = new Position(0.8, 1.5);
		this.speed = new Position(0, 0);
		this.type = 'player';
	}

	moveX(level, keys) {
		this.speed.x = 0;
		if (keys.left) {
			this.speed.x -= PlayerMovement.xSpeed;
		}
		if (keys.right) {
			this.speed.x += PlayerMovement.xSpeed;
		}

		const newPosition = this.position.plus(this.speed.x * step, 0);
		const obstacle = level.obstacleAt(newPosition, this.size);
		if (obstacle) {
			level.playerTouched(obstacle);
		} else {
			this.position = newPosition;
		}
	}

	moveY(level, keys) {
		this.speed.y += step * PlayerMovement.gravity;
		const newPosition = this.position.plus(0, this.speed.y * step);
		const obstacle = level.obstacleAt(newPosition, this.size);
		if (obstacle) {
			level.playerTouched(obstacle);
			if (keys.up && this.speed.y > 0) {
				this.speed.y = -PlayerMovement.jumpSpeed;
			} else {
				this.speed.y = 0;
			}
		} else {
			this.position = newPosition;
		}
	}

	act(level, keys) {
		this.moveY(level, keys);
		this.moveX(level, keys);

		const otherActor = level.actorAt(this);
		if (otherActor) {
			level.playerTouched(otherActor.type, otherActor);
		}
	}
}