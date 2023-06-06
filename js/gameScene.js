/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: ZoiaB
// Edited on: May 2023
// This is the Game Scene


// Adding to Phaser.Scene
class GameScene extends Phaser.Scene {
  // Create a bomb and setting velocity
  createBomb () {
    const bombXLocation = Math.floor(Math.random() * 1920) +1
    let bombXVelocity = Math.floor(Math.random() * 50) + 1
    bombXVelocity *= Math.round(Math.random()) ? 1 : -1
    const aBomb = this.physics.add.sprite(bombXLocation, -100, "bomb")
    aBomb.body.velocity.y = 200
    aBomb.body.velocity.x = bombXVelocity
    this.bombGroup.add(aBomb)
  }

  // This is the constructor for the game scene
  constructor() {
    super({ key: "gameScene"})
    // Assigning null to background, monster, and score text, false the fireMissile, and 0 to score
    this.background = null
    this.monster = null
    this.fireMissile = false
    // Score and score text
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: "65px Roboto", fill: "#0A9396", align: "center"}
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
    this.monster = this.physics.add.sprite(1920 / 2, 1080 - 100, "monster");
    // Missiles
    this.missileGroup = this.physics.add.group()
    // Bombs
    this.bombGroup = this.add.group()
    this.createBomb()

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
      this.sound.play("bomb")
      this.physics.pause()
      bombCollide.destroy()
      monsterCollide.destroy()
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "Game Over!\nClick to play again.", this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true})
      this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
    }.bind(this))
  }

  // Update using time and delta
  update(time, delta) {
    // Keys to control movement of the monster and missiles
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

    // If statement for if the left arrow is pressed
    if (keyLeftObj.isDown === true) {
      this.monster.x = this.monster.x - 15
      if (this.monster.x < 0) {
        this.monster.x = 1920
      }
    }

    // If statement for if the right arrow is pressed
    if (keyRightObj.isDown === true) {
      this.monster.x = this.monster.x + 15
      if (this.monster.x > 1920) {
        this.monster.x = 0
      }
    }

    // If statement for if the space is pressed
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // Firing missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.monster.x, this.monster.y, "missile").setScale(0.7)
        this.missileGroup.add(aNewMissile)
        this.sound.play("laser")
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
