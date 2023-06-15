/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: ZoiaB
// Edited on: May 2023
// This is the Phaser3 configuration file

// Scene import statements
import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"
import MenuScene from "./menuScene.js"
import GameScene from "./gameScene.js"
import InstructionsScene from "./instructionsScene.js"

// For game scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()
const instructionsScene = new InstructionsScene()

// Constant for setting up basic game
const  config = {
  // Game type
  type: Phaser.AUTO,
  // Width and height of the screen
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  // Set background color
  backgroundColor: 0x3f6e9a,
  // Scale of background change to accommodate window size changing
  scale: {
    mode: Phaser.Scale.FIT,
    // Placing it in the middle of the page
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
}

// Creating new Phaser game
const game = new Phaser.Game(config)

// Add scenes
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)
game.scene.add("menuScene", menuScene)
game.scene.add("gameScene", gameScene)
game.scene.add("instructionsScene", instructionsScene)

// Starting scene
game.scene.start("splashScene")
