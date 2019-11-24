import { ArenaLevel } from "./ArenaLevel.js";
import { ArenaDeathScene } from "./ArenaDeathScene.js";
import { PreloaderArena } from "./PreloaderArena.js";
import { Connection } from "./Connection.js";
import { ServerSelect } from "./ServerSelect.js";


export class ArenaMode 
{
    constructor() 
    {
        this.MatterPhysics = Phaser.Physics.Matter.Matter;
        this.isMobile = true;

        //Detecting the Device's Size and Set Max
        let defaultWidth = 1200;
        let defaultHeight = 600;

        let connection = new Connection();

        //Initializing Level
        let preloader = new PreloaderArena(this);
        let serverList = new ServerSelect(this, connection);
        let levelarena = new ArenaLevel(this, connection);
        let death = new ArenaDeathScene(this);

        //Initializing Config
        this.config = {
            type: Phaser.AUTO,
            pixelArt: true,
            activePointers: 4,
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 1.3}
                }
            },
            scale: {
                mode: Phaser.Scale.FIT,
                parent: 'AWesternStory',
                width: defaultWidth,
                height: defaultHeight,
            },
            canvasStyle: 'padding: 0; margin: auto; display: block; position: absolute; top: 0; bottom: 0; left: 0; right: 0;',
            plugins: {
                scene: [
                    {
                        plugin: rexvirtualjoystickplugin,
                        key: "rexVirtualJoyStick",
                        mapping: "rexVirtualJoyStick"
                    },
                    {
                        plugin: PhaserMatterCollisionPlugin,
                        key: "matterCollision",
                        mapping: "matterCollision"
                    }
                ]
            },
         
            scene: [preloader, serverList, levelarena, death]

        };

        let game = new Phaser.Game(this.config);
        //Disable right click menu on canvas
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        if (game.device.os.android || 
            game.device.os.iOS || 
            game.device.os.iPad || 
            game.device.os.iPhone ||
            game.device.os.windowsPhone)
        {
            this.isMobile = true;
        }
    }
}

let A_Western_Story = new ArenaMode();

