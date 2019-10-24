import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";

export class Bullet
{
    constructor(scene, target, fromX, fromY, toX, toY)
    {
        this.scene = scene;
        this.target = target;
        this.sprite = scene.matter.add.sprite(fromX, fromY, 'bullet');
        

        //Add to Group
        scene.projectiles.list.push(this);

        //Add Collision Body
        let { Bodies} = scene.PhaserGame.MatterPhysics

        let mainBody = Bodies.rectangle
            (0, 0, this.sprite.width, this.sprite.height, {frictionAir: 0});

        //Add Events
        scene.matterCollision.addOnCollideStart({
            objectA: this.sprite,
            objectB: this.scene.map.platforms.list,
            callback: this.destroy,
            context: this
        });

        scene.matterCollision.addOnCollideStart({
            objectA: this.sprite,
            callback: eventData => {
                this.hit(eventData.gameObjectB);
            },
            context: this
        });
        
        //Set a speed value
        let speed = 10;

        //Normalize Vector X, Y and Multiply by Speed
        let distX = toX - fromX;
        let distY = toY - fromY;
        let magnitude = Math.sqrt(distX * distX + distY * distY);
        let normalizeX = 0;
        let normalizeY = 0;

        if (magnitude > 0)
        {
            normalizeX = distX / magnitude;
            normalizeY = distY / magnitude;
        } else 
        {
            normalizeX = 1;
        }

        let vX = normalizeX * speed;
        let vY = normalizeY * speed;

        let radians = Math.atan2(vY, vX);

        //Setting Sprite

        this.sprite
            .setExistingBody(mainBody)
            .setPosition(fromX, fromY)
            .setIgnoreGravity(true)
            .setVelocity(vX, vY)
            .setRotation(radians)
            .setFixedRotation()
            .setCollisionCategory(2)
            .setCollidesWith([2]);

        if (target != null) {
            this.sprite.setCollidesWith([2, target.category]);
        }
    } 
      
    update()
    {
        if (this.scene.cameras.main.worldView.width > this.scene.map.levelWidth &&
            this.sprite.x > this.scene.cameras.main.worldView.width)
        {
            this.destroy();
            return;
        } 
        else if (this.scene.cameras.main.worldView.width < this.scene.map.levelWidth)
        { 
            let xBound = this.sprite.x - this.scene.cameras.main.worldView.x;

            if(xBound > this.scene.map.levelWidth)
            {
                this.destroy();
                return;
            }
        }

        if (this.scene.cameras.main.worldView.height > this.scene.map.levelHeight &&
            this.sprite.y > this.scene.cameras.main.worldView.height)
        {
            this.destroy();
            return;
        }
        else if (this.scene.cameras.main.worldView.height < this.scene.map.levelHeight)
        {
            let yBound = this.sprite.y - this.scene.cameras.main.worldView.y;

            if(yBound > this.scene.map.levelHeight)
            {
                this.destroy();
                return;
            }
        }

        if(this.sprite.y < 0 || this.sprite.x < 0)
        {
            this.destroy();
            return;
        }
    }

    hit(target)
    {
        if (target != null && (target instanceof Enemy || target instanceof Player)) {
            target.changeHealth(-5);
        }
        this.destroy();
    }

    destroy()
    {   
        console.log("Bullet Destroyed!");
        this.scene.matterCollision.removeOnCollideStart();
        this.scene.projectiles.list.splice(this.scene.projectiles.list.indexOf(this), 1);
        this.sprite.destroy();
    }
}