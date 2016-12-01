import Position from './Position';
import Lava from './Lava';
import Coin from './Coin';
import Player from './Player';
import { arrowCodes } from '../config/constants';

export default class Level {

	constructor(options) {
		this.plan = options.plan;
		this.width = this.plan[0].length;
		this.height = this.plan.length;
		this.planGrid = [];
		this.actors = [];
		this.player = null;

		this.createLevel();

		this.status = null;
		this.finishDelay = null;
		this.keys = this.trackKeys(arrowCodes);
	}

	createLevel() {
		for (let y = 0; y < this.height; y++) {
			const line = this.plan[y];
			const planGridLine = [];
			for (let x = 0; x < this.width; x++) {
				const char = line[x];
				let fieldType = null;

				switch (char) {
					case '@': {
						const player = new Player(new Position(x, y));
						this.actors.push(player);
						this.player = player;
						break;
					}
					case '=':
					case '|':
					case 'v':
						this.actors.push(new Lava(new Position(x, y), char));
						break;
					case 'o':
						this.actors.push(new Coin(new Position(x, y)));
						break;
					case 'x':
						fieldType = 'wall';
						break;
					case '!':
						fieldType = 'lava';
						break;
					default:
						break;
				}
				planGridLine.push(fieldType);
			}
			this.planGrid.push(planGridLine);
		}
		// setInterval(() => { this.actors.map((b) => b.act(this, this.keys)); }, step * 1000);
	}

	isFinished() {
		return this.status !== null && this.finishDelay < 0;
	}

	obstacleAt(position, size) {
		const xStart = Math.floor(position.x);
		const xEnd = Math.ceil(position.x + size.x);
		const yStart = Math.floor(position.y);
		const yEnd = Math.ceil(position.y + size.y);

		if (xStart < 0 || xEnd > this.width || yStart < 0) {
			return 'wall';
		}
		if (yEnd > this.height) {
			return 'lava';
		}
		for (let y = yStart; y < yEnd; y++) {
			for (let x = xStart; x < xEnd; x++) {
				const fieldType = this.planGrid[y][x];
				if (fieldType) {
					return fieldType;
				}
			}
		}
		return null;
	}

	actorAt(actor) {
		for (let i = 0; i < this.actors.length; i++) {
			const other = this.actors[i];
			if (other !== actor &&
				actor.position.x + actor.size.x > other.position.x &&
				actor.position.x < other.position.x + other.size.x &&
				actor.position.y + actor.size.y > other.position.y &&
				actor.position.y < other.position.y + other.size.y) {
				return other;
			}
		}
		return null;
	}

	playerTouched(type, actor) {
		if (type === 'lava' && this.status === null) {
			this.status = 'lost';
			this.finishDelay = 1;
		} else if (type === 'coin') {
			this.actors = this.actors.filter(other => other !== actor);
			if (!this.actors.some(actor1 => actor1.type === 'coin')) {
				this.status = 'won';
				this.finishDelay = 1;
			}
		}
	}

	trackKeys(codes) {
		const pressed = Object.create(null);
		function handler(event) {
			if ({}.hasOwnProperty.call(codes, event.keyCode)) {
				pressed[codes[event.keyCode]] = event.type === 'keydown';
				event.preventDefault();
			}
		}
		addEventListener('keydown', handler);
		addEventListener('keyup', handler);
		return pressed;
	}
}