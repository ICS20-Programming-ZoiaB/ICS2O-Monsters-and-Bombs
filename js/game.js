/* global Phaser */

// Copyright (c) 2023 ZoiaB All rights reserved
//
// Created by: ZoiaB
// Created on: May 2023
// This file contains the JS functions for index.html

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
console.log(game)