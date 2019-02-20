#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
require('./plugins/inquirer-autocomplete')
const fuzzy = require('fuzzy')
const api = require('./api')

let countryOptions = []

const listCountries = async () => {
  if (countryOptions.length === 0) {
    await api
      .listMarkets()
      .then(data => {
        countryOptions = data.map((item) => ({ value: item.Code, name: item.Name }))
      })
  }
  return countryOptions
}

const searchCountries = async (answers, input = '') => {
  const list = await listCountries()
  const options = {
    extract: function (el) { return el.name }
  }
  const results = await fuzzy.filter(input, list, options)
  return results.map(result => result.original)
}

const countrySelect = async (message = 'Search for a country') => {
  return inquirer
    .prompt([{
      type: 'autocomplete',
      name: 'value',
      message,
      source: searchCountries
    }])
}

module.exports = {
  countrySelect
}
