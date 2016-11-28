import Position from './Position';
import Lava from './Lava';
import Coin from './Coin';
import Player from './Player';

export default class Level{

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
	}

	render() {
		return(
			<div>
				Hello
			</div>
		);
	}

	isFinished() {
		console.log('Level creation finished!');
	}


	createLevel() {
		console.log('Creating level!');

		for (let y = 0; y < this.height; y++) {
			const line = this.plan[y];
			let planGridLine = [];
			for (let x = 0; x < this.width; x++) {
				const char = line[x];
				let fieldType = null;

				switch(char) {
					case '@':
						const player = new Player(new Position(x, y));
						this.actors.push(player);
						this.player = player;
						break;
					case '=':
					case '|':
					case 'v':
						this.actors.push(new Lava(new Position(x, y), char));
						break;
					case 'o':
						this.actors.push(new Coin(new Position(x, y)));
						break;
					case 'x':
						fieldType = "wall";
						break;
					case '!':
						fieldType = "lava";
						break;
				}
				planGridLine.push(fieldType);
			}
			// console.log('planGrindLine: ' + planGridLine);
			this.planGrid.push(planGridLine);
		}
		//console.log('----------actors: ', this.actors);
		this.isFinished();
	}


}