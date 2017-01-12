// TODO decide on structure - keep sprites in the game folder or make a new one?
import Phaser from 'phaser';

export default class Player extends Phaser.Sprite {
	constructor(game) {
		super();
		Phaser.Sprite.call(this, game, 110, 40, 'dude');

		game.add.existing(this);
		this.animations.add('right', [5, 6, 7, 8], 10, true);
		this.animations.add('left', [0, 1, 2, 3], 10, true);

		this.body.gravity.y = 600;
		this.cursor = game.input.keyboard.createCursorKeys();
	}

	update() {
		if (this.cursor.left.isDown) {
			this.body.velocity.x = -200;
			this.animations.play('left');
		} else if (this.cursor.right.isDown) {
			this.body.velocity.x = 200;
			this.animations.play('right');
		} else {
			this.body.velocity.x = 0;
			this.frame = 4;
		}

		// Make the player jump if he is touching the ground
		if (this.cursor.up.isDown && this.body.touching.down) {
			this.body.velocity.y = -250;
		}
	}
}