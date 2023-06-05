/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: ZoiaB
// Edited on: May 2023
// This is the Title Scene


// Adding to Phaser.Scene
class TitleScene extends Phaser.Scene {

  // This is the constructor for the title scene
  constructor() {
    super({ key: "titleScene"})
    // Assigns null to title scene background image and title scene text
    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    // Style for title scene text
    this.titleSceneTextStyle = {font: "135px Roboto", fill: "#0A9396", align: "center"}
  }

  // Initializing title scene with background color
  init(data) {
    this.cameras.main.setBackgroundColor("ffffff")
  }

  // Logs title scene 
  preload() {
    console.log("Title Scene")
    this.load.image("titleSceneBackground", "images/red-sun-scene-title.png")
  }

  // Creating data object
  create(data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, "titleSceneBackground").setScale(3.79999)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

    // Title scene text
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, "Monsters and Bombs", this.titleSceneTextStyle).setOrigin(0.5, 2.5)
  }

  // Switch to menu scene after 6000 milliseconds have elapsed
  update(time, delta) {
    if (time > 6000) {
      this.scene.switch("menuScene")
    }
  }
}

// Exports title scene as default
export default TitleScene
