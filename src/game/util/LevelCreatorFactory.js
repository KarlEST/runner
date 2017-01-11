import Wall from '../objects/Wall';
import Coin from '../objects/collectables/Coin';
import Enemy from '../characters/Enemy';

export const LevelCreatorFactory = {
    generateLevel(game, level, walls, coins, enemies) {
        const wallChar = 'x';
        const coinChar = 'o';
        const enemyChar = '!';

        for (let i = 0; i < level.length; i++) {
            for (let j = 0; j < level[i].length; j++) {

                // Create a wall and add it to the 'walls' group
                if (level[i][j] === wallChar) {
                    const wall = new Wall(game, j, i);
                    walls.add(wall);
                    wall.body.immovable = true;
                }

                // Create a coin and add it to the 'coins' group
                else if (level[i][j] === coinChar) {
                    const coin = new Coin(game, j, i);
                    coins.add(coin);
                }

                // Create a enemy and add it to the 'enemies' group
                else if (level[i][j] === enemyChar) {
                    const enemy = new Enemy(game, j, i)
                    enemies.add(enemy);
                }
            }
        }
    }
};