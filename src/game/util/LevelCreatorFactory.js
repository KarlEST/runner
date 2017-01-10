import Wall from '../Wall';
import Coin from '../Coin';
import Enemy from '../Enemy';

export const LevelCreatorFactory = {
    generateLevel(game, level, walls, coins, enemies) {
        const wallChar = 'x';
        const coinChar = 'o';
        const enemyChar = '!';
        // TODO replace game.add.sprites with respetive classes
        for (let i = 0; i < level.length; i++) {
            for (let j = 0; j < level[i].length; j++) {

                // Create a wall and add it to the 'walls' group
                if (level[i][j] === wallChar) {
                    const wall = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'wall');
                    walls.add(wall);
                    wall.body.immovable = true;
                }

                // Create a coin and add it to the 'coins' group
                else if (level[i][j] === coinChar) {
                    const coin = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'coin');
                    coins.add(coin);
                }

                // Create a enemy and add it to the 'enemies' group
                else if (level[i][j] === enemyChar) {
                    const enemy = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'lava');
                    enemies.add(enemy);
                }
            }
        }
    }
};