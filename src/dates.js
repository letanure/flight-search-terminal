#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const inquirerDatepicker = require('inquirer-datepicker')

inquirer.registerPrompt('datepicker', inquirerDatepicker)

const selectDate = async (message = 'Select a date:') => {
  const todayDate = new Date()
  return inquirer
    .prompt([
      {
        type: 'datepicker',
        name: 'value',
        message,
        format: ['DD', '/', 'MM', '/', 'Y'],
        default: todayDate,
        min: {
          year: todayDate.getFullYear(),
          month: todayDate.getMonth() + 1,
          day: todayDate.getDate()
        }
      }
    ])
}

module.exports = {
  selectDate
}
