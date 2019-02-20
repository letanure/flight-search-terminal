#!/usr/bin/env node
'use strict'
const inquirer = require('inquirer')
const inquirerAutocomplete = require('inquirer-autocomplete-prompt')

inquirer.registerPrompt('autocomplete', inquirerAutocomplete)
