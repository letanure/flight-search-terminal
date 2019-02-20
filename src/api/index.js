const axios = require('axios')

axios.create({
  baseURL: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/',
  timeout: 2000,
  headers: {
    'X-RapidAPI-Key': ''
  }
})

module.exports = {
}
