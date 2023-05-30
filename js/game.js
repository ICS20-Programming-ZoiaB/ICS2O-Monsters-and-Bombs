/* global Phaser */

// Copyright (c) 2023 ZoiaB All rights reserved
//
// Created by: ZoiaB
// Created on: May 2023
// This is the Phaser3 configuration file

// Scene import statements
import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"

// Our game scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()

//* Game scene */
const  config = {
  type: Phaser.AUTO,
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
  scale: {
    mode: Phaser.Scale.FIT,
    // We place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
}

const game = new Phaser.Game(config)
// console.log (game)

//load scenes
//NOTE: remember any "key" is global and CAN NOT be reused
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)

//start title
game.scene.start("splashScene")
