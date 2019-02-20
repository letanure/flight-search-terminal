const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/',
  timeout: 2000,
  headers: {
    'X-RapidAPI-Key': ''
  }
})

const listCurrencies = async () => {
  const response = await instance.get('reference/v1.0/currencies')
  const data = await response.data.Currencies
  return data
}

const listMarkets = async () => {
  const response = await instance.get('reference/v1.0/countries/en-US')
  const data = await response.data.Countries
  return data
}

const listPlaces = async (query, countryCode, currencyCode = 'EUR', localeISO = 'en-GB') => {
  const response = await instance.get(`autosuggest/v1.0/${countryCode}/${currencyCode}/${localeISO}/?query=${query}`)
  const data = await response.data.Places
  return data
}

module.exports = {
  listMarkets,
  listCurrencies,
  listPlaces
}
