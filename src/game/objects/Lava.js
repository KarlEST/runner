import Phaser from 'phaser';

export default class Lava extends Phaser.Sprite {
	constructor(game, xCord, yCord) {
		super();
		Phaser.Sprite.call(this, game, 20 * xCord, 20 * yCord, 'lava');
		game.add.existing(this);
	}
}