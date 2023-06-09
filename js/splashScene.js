/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: ZoiaB
// Edited on: May 2023
// This is the Splash Scene

// This class is the Splash Scene.
class SplashScene extends Phaser.Scene {

  // This is the constructor for the splash scene
  constructor() {
    super({ key: "splashScene"})
  }

  // Initializing scene and setting background color
  init(data) {
    this.cameras.main.setBackgroundColor("94D2BD")
  }

  // Loads and logs splash scene image
  preload() {
    console.log("Splash Scene")
    this.load.image("splashSceneBackground", "images/splashSceneImage.png")
  }

  // Creates and properly positions splash scene background
  create(data) {
    // Background image
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, "splashSceneBackground")
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
    // Special effect to rotate the image continuously (site referenced for the method: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/tween-timeline/, and site referenced for the math: https://youtu.be/z8vj8tUCkxY and https://ee.stanford.edu/~hellman/playground/hyperspheres/radians.html#:~:text=There%20are%202%CF%80%20radians%20in,%C2%B0%20to%20four%20significant%20figures.)
    this.tweens.add({
      targets: this.splashSceneBackgroundImage,
      rotation: Math.PI * 2,
      duration: 250,
      repeat: 0
    });
  }

  // If statement to switch to title scene after 4000 milliseconds have elapsed
  update(time, delta) {
    if (time > 4000) {
      this.scene.switch("titleScene")
    }
  }
}

// Exports splash scene as default
export default SplashScene
