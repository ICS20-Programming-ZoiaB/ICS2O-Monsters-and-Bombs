/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: ZoiaB
// Edited on: June 2023
// This is the Instructions Scene

// This class is the Instructions Scene
class InstructionsScene extends Phaser.Scene {
  // This is the constructor
  constructor() {
    super({key: "instructionsScene" })
    this.instructionsSceneBackgroundImage = null
    // Constructing back button
    this.backButton = null
    // Text and style
    this.instructionsText = null
    this.instructionsTextStyle = {font: "50px Roboto", fill: "#0A9396", align: "center"}
  }

  // Initializing scene with background color
  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  // Logs scene
  preload() {
    console.log("Instructions Scene")
    // Loading in the images for the background and the back button
    this.load.image("instructionsSceneBackgroundImage", "./images/sunset-road-instructions.png");
    this.load.image("backButton", "./images/back.png");
  }

  // Creating and positioning images and text
  create(data) {
    // Background image
    this.instructionsSceneBackgroundImage = this.add.sprite(0, 0, "instructionsSceneBackgroundImage").setScale(3.79999)
    this.instructionsSceneBackgroundImage.x = 1920 / 2
    this.instructionsSceneBackgroundImage.y = 1080 / 2
    // Adding the instructions text
    this.instructionsText = this.add.text(1920 / 2, (1080 / 2) - 230, "You are a hydra.\nUse the arrow keys to move left and right, dodging bombs.\nUse the spacebar to shoot fire-missiles at the falling bombs\nand gain points.\nIf a bomb hits you, game over.\nGood luck!", this.instructionsTextStyle).setOrigin(0.5, 0.9)
    // Back button
    this.backButton = this.add.sprite(1920 / 2, (1080 / 2) + 320, "backButton")
    this.backButton.setInteractive({ useHandCursor: true })
    this.backButton.on("pointerdown", () => this.clickBack())
  }

  //update using time and delta
  update(time, delta) {
  }

  // Function for when back button is clicked (return to the menu scene)
  clickBack() {
    this.scene.start("menuScene")
  }
}

// Export instructions scene as default
export default InstructionsScene