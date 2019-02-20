#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const clear = require('clear')
const menuConfig = require('./menuConfig')

const menuMain = async () => {
  clear()
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'value',
        message: 'Select:',
        choices: [
          { value: 'menuConfig', name: 'Config' }
        ]
      }
    ])
}

const init = async () => {
  const menuOption = await menuMain()
  switch (menuOption.value) {
    case 'menuConfig':
      menuConfig.editConfig()
      break
  }
}

init()

module.exports = {
  menuMain,
  init
}
