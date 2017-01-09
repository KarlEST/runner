import React from 'react';
import ReactDom from 'react-dom';
import Root from './Root';
import 'pixi.js';
import 'p2';
import Phaser from 'phaser';

import playerImg from './gfx/img/player.png';
import wallImg from './gfx/img/wall.png';
import coinImg from './gfx/img/coin.png';
import lavaImg from './gfx/img/lava.png';
import dudeImg from './gfx/img/dude.png';

import './gfx/main.scss';

// ReactDom.render(
// 	<Root />,
// 	document.getElementById('content')
// );

const mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds

		game.load.image('player', playerImg);
		game.load.image('wall', wallImg);
		game.load.image('coin', coinImg);
		game.load.image('lava', lavaImg);
		game.load.spritesheet('dude', dudeImg, 32, 48, -1, 0, 0)
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

		// Set the background color to blue
		game.stage.backgroundColor = '#3598db';

        // Start the Arcade physics system (for movements and collisions)
		game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all game objects
		game.world.enableBody = true;

		// Variable to store the arrow key pressed
		this.cursor = game.input.keyboard.createCursorKeys();

        // Create the player in the middle of the game
		this.player = game.add.sprite(70, 100, 'dude');
		this.player.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player.animations.add('right', [5, 6, 7, 8], 10, true);
		this.player.scale.setTo(0.5, 0.5);
        // Add gravity to make it fall
		// this.player.body.gravity.y = 600;
		game.physics.arcade.gravity.y = 600;
		// Create 3 groups that will contain our objects
		this.walls = game.add.group();
		this.coins = game.add.group();
		this.enemies = game.add.group();

		// Design the level. x = wall, o = coin, ! = lava.
		const level = [
			'xxxxxxxxxxxxxxxxxxxxxx',
			'x         !          x',
			'x                 o  x',
			'x         o          x',
			'x                    x',
			'x     o   !    x     x',
			'xxxxxxxxxxxxxxxx     x',
			'x                    x',
			'x                    x',
			'x     !   o  !   o   x',
			'x   xxxxxxxxxxxxxxxxxx',
			'x          o         x',
			'x                    x',
			'x  o                 x',
			'xxxxxxxxxxxxxxx!!  !!x',
			'x  !     !           x',
			'x                    x',
			'x                    x',
			'x  o     !       !! ox',
			'xxxxxxxxxxxxxxxxxxxxxx',
		];

		// Create the level by going through the array
		for (let i = 0; i < level.length; i++) {
			for (let j = 0; j < level[i].length; j++) {

				// Create a wall and add it to the 'walls' group
				if (level[i][j] === 'x') {
					const wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
					this.walls.add(wall);
					wall.body.immovable = true;
					wall.body.allowGravity = false;
				}

				// Create a coin and add it to the 'coins' group
				else if (level[i][j] === 'o') {
					const coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
					this.coins.add(coin);
					coin.body.allowGravity = false;
				}

				// Create a enemy and add it to the 'enemies' group
				else if (level[i][j] === '!') {
					const enemy = game.add.sprite(30+20*j, 30+20*i, 'lava');
					this.enemies.add(enemy);
					enemy.body.allowGravity = false;
				}
			}
		}
    },

    update:  function() {
        // This function is called 60 times per second
        // It contains the game's logic

		// Make the player and the walls collide
		game.physics.arcade.collide(this.player, this.walls);

		// Call the 'takeCoin' function when the player takes a coin
		game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

		// Call the 'restart' function when the player touches the enemy
		game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
		// Move the player when an arrow key is pressed
		if (this.cursor.left.isDown) {
			this.player.body.velocity.x = -200;
			this.player.animations.play('left');
		} else if (this.cursor.right.isDown) {
			this.player.body.velocity.x = 200;
			this.player.animations.play('right');
		} else {
			this.player.body.velocity.x = 0;
			this.player.frame = 4;
		}

		// Make the player jump if he is touching the ground
		if (this.cursor.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -250;
		}
    },

	// Function to kill a coin
	takeCoin: function(player, coin) {
		coin.kill();
	},

	// Function to restart the game
	restart: function() {
		game.state.start('main');
	},
};

const game = new Phaser.Game(800, 500);
game.state.add('main', mainState);
game.state.start('main');