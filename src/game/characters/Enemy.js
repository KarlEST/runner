import Phaser from 'phaser';

export default class Enemy extends Phaser.Sprite {
	constructor(game, xCord, yCord) {
		super();
		Phaser.Sprite.call(this, game, 20 * xCord, 20 * yCord, 'wall');
		game.add.existing(this);
	}
}