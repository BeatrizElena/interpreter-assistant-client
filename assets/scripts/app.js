'use strict'

const events = require('./events.js')

$(() => {
  $('.show-after-login').hide()
  $('#message').hide()
  $('#show-data').hide()
  events.addHandlers()
})
