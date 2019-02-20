#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const clear = require('clear')

const menuConfig = async () => {
  clear()
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'value',
        message: 'What do you want to update?',
        choices: [
          { value: 'currency', name: 'Currency' },
          { value: 'country', name: 'Country' },
          { value: 'language', name: 'Language' },
          new inquirer.Separator(),
          { value: 'back', name: '<< Back' }
        ]
      }
    ])
}

const editConfig = async () => {
  const configToEdit = await menuConfig()
  let valueUpdated = null
  switch (configToEdit.value) {
    case 'currency':
      break
    case 'country':
      break
    case 'language':
      break
    case 'back':
      const index = require('./index.js')
      index.init()
      break
  }
  if (valueUpdated) {
    editConfig()
  }
}

module.exports = {
  editConfig
}
