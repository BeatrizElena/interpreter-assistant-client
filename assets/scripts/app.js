'use strict'

const events = require('./events.js')

$(() => {
  $('.resources').hide()
  $('.show-after-login').hide()
  events.addHandlers()
})
