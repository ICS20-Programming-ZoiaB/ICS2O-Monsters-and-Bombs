/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: ZoiaB
// Edited on: May 2023
// This is the Menu Scene

// Adding to Phaser.Scene
class MenuScene extends Phaser.Scene {

  // This is the constructor for the menu scene
  constructor() {
    super({ key: "menuScene"})
    // Assigning null to menu scene background image
    this.menuSceneBackgroundImage = null
    // Button to start game
    this.startButton = null
    // Button to go to instructions scene
    this.instructionsButton = null
    // Adding background music
    this.menuMusic = null;
  }

  // Initializing menu scene with background color
  init(data) {
    this.cameras.main.setBackgroundColor("ffffff")
  }

  // Logs menu scene 
  preload() {
    console.log("Menu Scene")
    this.load.image("menuSceneBackground", "images/gradient-sky-menu.png")
    this.load.image("startButton", "images/start.png")
    this.load.image("instructionsButton", "images/instructions.png")
    this.load.audio("menuMusic", "audio/menu-background-music.mp3")
  }

  // Creating objects such as background image and buttons
  create(data) {
    // Create background music
    this.menuMusic = this.sound.add("menuMusic")
    this.menuMusic.loop = true
    this.menuMusic.play()
    // Background image
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, "menuSceneBackground").setScale(3.79999)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2
    //Start button
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, "startButton")
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on("pointerdown", () => this.clickStart())
    //Instructions button
    this.instructionsButton = this.add.sprite(1920 / 2, (1080 / 2) + 300, "instructionsButton")
    this.instructionsButton.setInteractive({ useHandCursor: true })
    this.instructionsButton.on("pointerdown", () => this.clickInstructions())
  }

  // Update using time and delta
  update(time, delta) {
  }

  // Function for clicking start button
  clickStart() {
    this.scene.start("gameScene")
    // Pauses background music
    this.menuMusic.pause()
    this.menuMusic.loop = false
  }

  // Function for clicking instructions button
  clickInstructions() {
    this.scene.start("instructionsScene")
    // Pauses background music
    this.menuMusic.pause()
    this.menuMusic.loop = false
  }
}

// Exports menu scene as default
export default MenuScene
