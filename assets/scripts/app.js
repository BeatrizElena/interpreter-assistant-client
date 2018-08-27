'use strict'

const events = require('./events.js')

$(() => {
  $('.resources').hide()
  events.addHandlers()
})
