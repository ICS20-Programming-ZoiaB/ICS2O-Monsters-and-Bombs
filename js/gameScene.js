/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: ZoiaB
// Edited on: May 2023
// This is the Game Scene

// Adding to Phaser.Scene
class GameScene extends Phaser.Scene {
  // Setting bomb velocity, location, and scale
  createBomb () {
    const bombXLocation = Math.floor(Math.random() * 1920) +1
    let bombXVelocity = Math.floor(Math.random() * 50) + 1
    bombXVelocity *= Math.round(Math.random()) ? 1 : -1
    const aBomb = this.physics.add.sprite(bombXLocation, -100, "bomb").setScale(0.5)
    aBomb.body.velocity.y = 100
    aBomb.body.velocity.x = bombXVelocity
    this.bombGroup.add(aBomb)
  }

  // This is the constructor for the game scene
  constructor() {
    super({ key: "gameScene"})
    // Assigning null to background and monster, false to the fireMissile
    this.background = null
    this.monster = null
    this.fireMissile = false
    // Score and score text
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: "65px Roboto", fill: "#0A9396", align: "center"}
    //Game over text
    this.gameOverText = null
    this.gameOverTextStyle = { font: "65px Roboto", fill: "#0A9396", align: "center"}
  }

  // Initializing game scene with background color
  init(data) {
    this.cameras.main.setBackgroundColor("ffffff")
  }

  // Logs game scene 
  preload() {
    console.log("Game Scene")
    // Images
    this.load.image("sunsetBackground", "images/sunset-background-game.png")
    this.load.image("monster", "images/monster.png")
    this.load.image("missile", "images/fire-missile.png")
    this.load.image("bomb", "images/bomb.png")
    // Sound
    this.load.audio("laser", "audio/missile-sound-effect.wav")
    this.load.audio("explosion", "audio/explosion-sound-effect.wav")
    this.load.audio("bomb", "audio/bomb-sound-effect.wav")
  }

  // Creating game objects
  create(data) {
    // Background
    this.background = this.add.image(1920 / 2, 1080 / 2, "sunsetBackground").setScale(3.79999);
    // Score
    this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle)
    // Monster
    this.monster = this.physics.add.sprite(1920 / 2, 1080 - 75, "monster").setScale(0.5);
    // Missiles
    this.missileGroup = this.physics.add.group()
    // Bombs
    this.bombGroup = this.add.group()
    this.createBomb()
    // Timer that controls the time for bombs and make it re-spawn even if user does nothing (method taken from: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/)
    this.bombTimer = this.time.addEvent({
      delay: 4000,
      callback: this.createBomb,
      callbackScope: this,
      loop: true
    });

    // Collisions between bombs and missiles
    this.physics.add.collider(this.missileGroup, this.bombGroup, function(missileCollide, bombCollide) {
      // Destroy bomb and missile when they collide
      bombCollide.destroy()
      missileCollide.destroy()
      // Play sound effect
      this.sound.play("explosion")
      // Getting score
      this.score = this.score + 1
      this.scoreText.setText("Score: " + this.score.toString())
      // Creating bomb
      this.createBomb()
      this.createBomb()
    }.bind(this))

    // Collisions between bombs and monster
    this.physics.add.collider(this.monster, this.bombGroup, function (monsterCollide, bombCollide) {
      // Play sound
      this.sound.play("bomb")
      // Pause space bar so that missiles cannot fire when game is over
      const keySpaceObj = this.input.keyboard.addKey("SPACE")
      keySpaceObj.enabled = false;
      this.physics.pause()
      // Destroy when collision occurs
      bombCollide.destroy()
      monsterCollide.destroy()
      // Game over text
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "Game Over!\nClick to play again.", this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true})
      this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
      // Reset score to 0
      this.score = 0;
    }.bind(this))
  }

  // Update using time and delta
  update(time, delta) {
    
    // Keys to control movement of the monster
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

    // If statement for if the left arrow is pressed
    if (keyLeftObj.isDown === true) {
      this.monster.x = this.monster.x - 15
       // Making monster face direction in which it is going (method taken from: https://gamedev.stackexchange.com/questions/146525/how-to-flip-sprites-with-different-dimensions-horizontally)
      this.monster.setScale(0.5, 0.5);
      // Wrapping to other side if it passes scene border
      if (this.monster.x < 0) {
        this.monster.x = 1920
      }
    }

    // If statement for if the right arrow is pressed
    if (keyRightObj.isDown === true) {
      this.monster.x = this.monster.x + 15
      // Making monster face direction in which it is going  (method taken from: https://gamedev.stackexchange.com/questions/146525/how-to-flip-sprites-with-different-dimensions-horizontally)
      this.monster.setScale(-0.5, 0.5);
      // Wrapping to other side if it passes scene border
      if (this.monster.x > 1920) {
        this.monster.x = 0
      }
    }

    // If statement for if the space is pressed
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        this.fireMissile = true;
      // Variable for missile location
      let missileX;
      // If monster scale has positive x value, let missile location -70
      if (this.monster.scaleX === 0.5) {
        missileX = this.monster.x - 70;
      } 
      // Else (monster scale x value is negative) let missile location + 70
      else {
        missileX = this.monster.x + 70;
      }
        
    // Adding new missile
    const aNewMissile = this.physics.add.sprite(missileX, this.monster.y - 150, "missile").setScale(0.7);
    this.missileGroup.add(aNewMissile);
    this.sound.play("laser");
    }
  }

    // If statement for if the space is up
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }
    // To make missiles move up the screen
    this.missileGroup.children.each(function (item) {
       item.y = item.y - 15
      if (item.y < 0) {
        item.destroy()
      }
    })
  }
}

// Exports game scene as default
export default GameScene
