// TODO decide on structure - keep sprites in the game folder or make a new one?

import Phaser from 'phaser';

export default class Wall extends Phaser.Sprite {
	constructor(game, xCord, yCord) {
		super();
		Phaser.Sprite.call(this, game, 20 * xCord, 20 * yCord, 'wall');
		game.add.existing(this);
	}
}