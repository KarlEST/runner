import Phaser from 'phaser';

export default class Coin extends Phaser.Sprite {
	constructor(game, xCord, yCord) {
		super();
		Phaser.Sprite.call(this, game, 20 * xCord, 20 * yCord, 'coin');
		game.add.existing(this);
	}

	update() {

	}
}