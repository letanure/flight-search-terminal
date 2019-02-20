#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const clear = require('clear')
const CliTable = require('cli-table2')
const languagesMenu = require('./languages')
const currenciesMenu = require('./currencies')
const countriesMenu = require('./countries')
const dataStorage = require('./helpers/dataStorage')

const menuConfig = async () => {
  clear()
  tableConfig()
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

const tableConfig = () => {
  const table = new CliTable()
  const data = dataStorage.getData()
  Object.keys(data.config).map(keyConfig => {
    table.push({ [keyConfig]: data.config[keyConfig] })
  })
  console.log(table.toString())
}

const editConfig = async () => {
  const configToEdit = await menuConfig()
  let valueUpdated = null
  switch (configToEdit.value) {
    case 'currency':
      valueUpdated = await currenciesMenu.currencySelect('Select currency:')
      break
    case 'country':
      valueUpdated = await countriesMenu.countrySelect('Select country:')
      break
    case 'language':
      valueUpdated = await languagesMenu.languageSelect('Select language:')
      break
    case 'back':
      const index = require('./index.js')
      index.init()
      break
  }
  if (valueUpdated) {
    dataStorage.saveConfig(configToEdit.value, valueUpdated.value)
    editConfig()
  }
}

module.exports = {
  editConfig
}
