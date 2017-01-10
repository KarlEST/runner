// Place where image/sprite loading and level creating(maybe handling too, not sure yet if its on react side or where) is done
import 'pixi.js';
import 'p2';
import Phaser from 'phaser';

import {testLevel} from '../config/levels';
import Player from './Player';
import {LevelCreatorFactory} from './util/LevelCreatorFactory';

import playerImg from '../gfx/img/player.png';
import wallImg from '../gfx/img/wall.png';
import coinImg from '../gfx/img/coin.png';
import lavaImg from '../gfx/img/lava.png';
import dudeImg from '../gfx/img/dude.png';


const mainState = {
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the images and sounds

        game.load.image('player', playerImg);
        game.load.image('wall', wallImg);
        game.load.image('coin', coinImg);
        game.load.image('lava', lavaImg);
        game.load.spritesheet('dude', dudeImg, 32, 48, -1, 0, 0)
    },

    create: function () {
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
        // this.player = game.add.sprite(130, 70, 'dude');

        this.player = new Player(game);

        // Create 3 groups that will contain our objects
        // TODO Should we create these groups somewhere else or create them in another way
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();

        const level = testLevel;
        LevelCreatorFactory.generateLevel(game, level, this.walls, this.coins, this.enemies);
    },

    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic
        // Make the player and the walls collide
        game.physics.arcade.collide(this.player, this.walls);

        // Call the 'takeCoin' function when the player takes a coin
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

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
        if (this.coins.countLiving() === 0) {

            this.restart();
        }
    },

    // Function to kill a coin
    takeCoin: function (player, coin) {
        coin.kill();
    },

    // Function to restart the game
    restart: function () {
        game.state.start('main');
    },
};

const game = new Phaser.Game(800, 500, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');