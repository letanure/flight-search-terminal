#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
require('./plugins/inquirer-autocomplete')
const fuzzy = require('fuzzy')
const api = require('./api')

let currencyOptions = []

const listCurrencies = async () => {
  if (currencyOptions.length === 0) {
    await api
      .listCurrencies()
      .then(data => {
        currencyOptions = data.map(result => ({ value: result.Code, name: `${result.Code} : ${result.Symbol}` }))
      })
  }
  return currencyOptions
}

const searchCurrencies = async (answers, input = '') => {
  const list = await listCurrencies()
  const options = {
    extract: function (el) { return el.name }
  }
  const results = await fuzzy.filter(input, list, options)
  return results.map(result => result.original)
}

const currencySelect = async (message = 'Currency search') => {
  return inquirer
    .prompt([{
      type: 'autocomplete',
      name: 'value',
      message,
      source: searchCurrencies
    }])
}

module.exports = {
  currencySelect
}
