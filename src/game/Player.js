// TODO decide on structure - keep sprites in the game folder or make a new one?
import 'pixi.js';
import 'p2';
import Phaser from 'phaser';

export default class Player extends Phaser.Sprite{
    constructor(game) {
        super();
        Phaser.Sprite.call(this, game, 110, 40, 'dude');

        game.add.existing(this);
        this.animations.add('right', [5, 6, 7, 8], 10, true);
        this.animations.add('left', [0, 1, 2, 3], 10, true);

        this.body.gravity.y = 600;
    }

    update() {
        // Here happens the updating - same as in game.js

    }
}