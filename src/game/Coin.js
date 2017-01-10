import 'pixi.js';
import 'p2';
import Phaser from 'phaser';

export default class Coin extends Phaser.Sprite {
    constructor(game, xCord, yCord) {
        super();
        Phaser.Sprite.call(this, game, 30 + 20 * xCord, 30 + 20 * yCord, 'coin');
        game.add.existing(this);
    }

}