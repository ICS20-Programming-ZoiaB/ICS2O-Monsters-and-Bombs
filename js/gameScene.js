/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: ZoiaB
// Edited on: May 2023
// This is the Game Scene


// Adding to Phaser.Scene
class GameScene extends Phaser.Scene {

  // This is the constructor for the game scene
  constructor() {
    super({ key: "gameScene"})
    // Assigning null to background
    this.background = null
    this.monster = null
    this.fireMissile = false
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
  }

  // Creating game objects
  create(data) {
  this.background = this.add.image(1920 / 2, 1080 / 2, "sunsetBackground").setScale(3.79999);
  this.monster = this.physics.add.sprite(1920 / 2, 1080 - 100, "monster");
  this.missileGroup = this.physics.add.group();
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
      if (this.monster.x < 0) {
        this.monster.x = 0
      }
    }

    // If statement for if the right arrow is pressed
    if (keyRightObj.isDown === true) {
      this.monster.x = this.monster.x + 15
      if (this.monster.x > 1920) {
        this.monster.x = 1920
      }
    }

    // If statement for if the space is pressed
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        // Firing missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.monster.x, this.monster.y, "missile").setScale(0.7)
      this.missileGroup.add(aNewMissile)
      }
    }

    // If statement for if the space is up
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }
  }
}

// Exports game scene as default
export default GameScene
