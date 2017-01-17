import 'pixi.js'; // eslint-disable-line
import 'p2'; // eslint-disable-line
import Phaser from 'phaser';

import { testLevel } from '../config/levels';
import Player from './characters/Player';
import LevelCreatorFactory from './util/LevelCreatorFactory';

import playerImg from '../gfx/img/player.png';
import wallImg from '../gfx/img/wall.png';
import coinImg from '../gfx/img/coin.png';
import lavaImg from '../gfx/img/lava.png';
import dudeImg from '../gfx/img/dude.png';

const game = new Phaser.Game(800, 500, Phaser.AUTO, 'game');
const mainState = {
	preload() {
		game.load.image('player', playerImg);
		game.load.image('wall', wallImg);
		game.load.image('coin', coinImg);
		game.load.image('lava', lavaImg);
		game.load.spritesheet('dude', dudeImg, 32, 48, -1, 0, 0);
	},

	create() {
		game.stage.backgroundColor = '#3598db';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.enableBody = true;
		this.player = new Player(game);
		// TODO Should we create these groups somewhere else or create them in another way
		this.walls = game.add.group();
		this.coins = game.add.group();
		this.enemies = game.add.group();

		LevelCreatorFactory.generateLevel(game, testLevel, this.walls, this.coins, this.enemies);
	},

	update() {
		game.physics.arcade.collide(this.player, this.walls);
		game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

		if (this.coins.countLiving() === 0) {
			this.restart();
		}
	},

	takeCoin(_player, coin) {
		coin.kill();
	},

	restart() {
		game.state.start('main');
	},
};
game.state.add('main', mainState);
game.state.start('main');