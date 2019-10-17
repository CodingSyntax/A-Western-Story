import { Player } from "./Player.js";
import { LevelTutorial } from "./levels/LevelTutorial.js";

export class Game 
{
    constructor() {
        this.MatterPhysics = Phaser.Physics.Matter.Matter;

        let levelTutorial = new LevelTutorial(this);

        this.config = {
            type: Phaser.AUTO,
            //game: 'game',
            width: 800,
            height: 600,
            pixelArt: true,
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: .1},
                    debug: true
                }
            },
            scene: [levelTutorial]
        };

        let game = new Phaser.Game(this.config);
    }
}
