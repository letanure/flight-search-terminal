#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
require('./plugins/inquirer-autocomplete')
const api = require('./api')

const searchPlaces = async (answers, input = '') => {
  let results = []
  if (input.length >= 3) {
    results = await api.listPlaces(input, 'DE', 'EUR', 'en-US')
  }
  return results.map(result => ({ value: result.PlaceId, name: result.PlaceName }))
}

const selectPlace = async (message = 'City search') => {
  return inquirer
    .prompt([{
      type: 'autocomplete',
      name: 'value',
      message,
      source: searchPlaces
    }])
}
module.exports = {
  selectPlace
}
