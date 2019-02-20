#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
require('./plugins/inquirer-autocomplete')
const isoCodes = require('langs')
const fuzzy = require('fuzzy')

const languageSelect = async (message = 'Language search') => {
  return inquirer
    .prompt([{
      type: 'autocomplete',
      name: 'value',
      message,
      source: searchLanguages
    }])
}

const listLanguages = async () => {
  return isoCodes.all().map(lang => ({ value: lang['2'], name: `${lang.name} / ${lang.local}` }))
}

const searchLanguages = async (answers, input = '') => {
  const list = await listLanguages()
  const options = {
    extract: function (el) { return el.name }
  }
  const results = await fuzzy.filter(input, list, options)
  return results.map(result => result.original)
}

module.exports = {
  languageSelect
}
