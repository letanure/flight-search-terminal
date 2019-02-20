#!/usr/bin/env node

const { join } = require('path')
const fs = require('fs')

const dataStorePath = join(__dirname, 'searchs.json')

const saveJson = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, '\t'))

const getJson = (path) => {
  const data = fs.existsSync(path) ? fs.readFileSync(path) : []
  try {
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}

const getData = () => {
  return getJson(dataStorePath)
}

const saveConfig = (prop, newValue) => {
  let data = getData()
  data.config[prop] = newValue
  return saveJson(dataStorePath, data)
}

module.exports = {
  getData,
  saveConfig,
  saveJson,
  getJson
}
