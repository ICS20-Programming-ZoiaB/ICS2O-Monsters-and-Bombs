/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: ZoiaB
// Edited on: May 2023
// This is the Instructions Scene

// Adding to Phaser.Scene
class InstructionsScene extends Phaser.Scene {
  constructor() {
    
    // Using the "instructionsScene" key to create an object
    super({key: "instructionsScene" })
    // Constructing background image
    this.instructionsSceneBackgroundImage = null
    // Initializing back button
    this.backButton = null

    // Instructions scene text
    this.instructionsSceneText = null
    // Instructions scene text style
    this.instructionsSceneTextStyle = {font: "50px Roboto", fill: "#7b2cbf", align: "center"}

  // Initializing scene with background color
  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  // Logs instructions scene
  preload() {
    console.log("Instruction Scene")


    // Logs instructions scene 
  preload() {
    console.log("Instructions Scene")
    this.load.image("instructionsSceneBackgroundImage", "./images/instructionsSceneImage.png");
    this.load.image("backButton", "./images/back.png");
  }

  // Creating objects and setting them to desired locations
  create(data) {
    // Creating the background image and placing it into the scene
    this.instructionsSceneBackgroundImage = this.add.sprite(0, 0, "instructionsSceneBackgroundImage").setScale(1)
    this.instructionsSceneBackgroundImage.x = 1920 / 2
    this.instructionsSceneBackgroundImage.y = 1080 / 2
     this.backButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, "backButton")
    this.backButton.setInteractive({ useHandCursor: true })
    this.backButton.on("pointerdown", () => this.clickButton())
    
    // Title scene text
    this.instructionsSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, "1. Start the game./n2. Use the arrow keys to move the hydra left and right./n3. Press the spacebar to shoot fire missiles at the bombs and get points./n4. Don't get hit by the bombs, or it's game over./nGood luck!", this.instructionsSceneTextStyle).setOrigin(0.5, 2.5)
  }
    
    // Placing back button into scene with coordinates
    this.backButton = this.add.sprite(1920 / 2, (1080 / 2) + 320, "backButton")
    
    // Making back button interactive using the hand cursor
    this.backButton.setInteractive({ useHandCursor: true })
    
    // Creating a function when the button is clicked
    this.backButton.on("pointerdown", () => this.clickBack())
  }

  // Update using time and delta
  update(time, delta) {
  }
  
  // Function for clicking button
  clickBack() {
    this.scene.start("menuScene")
  }
}
