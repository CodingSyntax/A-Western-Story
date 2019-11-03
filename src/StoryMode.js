import { LevelTutorial } from "./levels/LevelTutorial.js";
import { DustinLevel } from "./levels/DustinLevel.js";
import { AlexLevel } from "./levels/AlexLevel.js";
import { EthanLevel } from "./levels/EthanLevel.js";
import { LoganLevel } from "./levels/LoganLevel.js";
import { DeathScene } from "./interfaces/DeathScene.js";
import { PreloaderScene } from "./interfaces/PreloaderScene.js";
import { MenuScene } from "./interfaces/MenuScene.js";

export class StoryMode 
{
    constructor() 
    {
        this.MatterPhysics = Phaser.Physics.Matter.Matter;
        this.isMobile = false;

        //Detecting the Device's Size and Set Max
        let maxWidth = 1200;
        let maxHeight = 600;
        
        let scaleWidth = window.innerWidth / maxWidth;
        let scaleHeight = window.innerHeight / maxHeight;
        this.scale = Math.min(scaleWidth, scaleHeight);
        
        let modifiedWidth = maxWidth * this.scale;
        let modifiedHeight = maxHeight * this.scale;

        if (this.scale < 1) 
        {
            maxHeight = modifiedHeight;
            maxWidth = modifiedWidth;
        } else 
        {
            this.scale = 1;
        }

        //Initializing Levels
        let preloader = new PreloaderScene(this);
        let menu = new MenuScene(this);

        let levelTutorial = new LevelTutorial(this);
        let level1 = new AlexLevel(this);
        let level2 = new DustinLevel(this);
        let level3 = new LoganLevel(this);
        let level4 = new EthanLevel(this);
        let death = new DeathScene(this);

        //Initializing Config
        this.config = {
            type: Phaser.AUTO,
            width: maxWidth,
            height: maxHeight,
            parent: 'phaser-game',
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            pixelArt: true,
            activePointers: 4,
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 1.3},
                    debug: true
                }
            },
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
          
            scene: [preloader, menu, levelTutorial, level1, level2, level3, level4, death]
        };

        let game = new Phaser.Game(this.config);

        if (game.device.os.android || 
            game.device.os.iOS || 
            game.device.os.iPad || 
            game.device.os.iPhone ||
            game.device.os.windowsPhone)
        {
            this.isMobile = true;
            ScreenOrientation.lock("landscape");
        }
    }
}

let A_Western_Story = new StoryMode();
