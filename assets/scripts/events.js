const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../lib/get-form-fields')

// User Auth
const signUp = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.userAuthError)
  $("#sign-up-form")[0].reset()
}

const signIn = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.userAuthError)
  $("#sign-in-form")[0].reset()
}

// const seePasswordForm = function(event){
//   event.preventDefault()
//   ui.onShowPasswordFormSuccess
// }

const changePassword = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.changePassword(data)
    .then(ui.onChangePwSuccess)
    .catch(ui.userAuthError)
  $("#change-password-form")[0].reset()
}

const signOut = function(event) {
  event.preventDefault()
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.userAuthError)
}

// Doctor Actions
const seeAllDoctors = function(event) {
  event.preventDefault()
  api.getAllDoctors()
    .then(ui.onGetAllDoctorsSuccess)
    .catch(ui.otherError)
  $("#see-all-doctors-form")[0].reset()
}

// Session Actions
const seeAllSessions = function(event) {
  event.preventDefault()
  api.getAllSessions()
    .then(ui.onGetAllSessionsSuccess)
    .catch(ui.otherError)
  $("#see-all-sessions-form")[0].reset()
}

const createOneSession = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createOneSession(data)
    .then(ui.onCreateOneSessionSuccess)
    .catch(ui.otherError)
  $("#create-one-session-form")[0].reset()
}

const seeOneSession = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.seeOneSession(data)
    .then(ui.onSeeOneSessionSuccess)
    .catch(ui.otherError)
  $("#see-one-session-form")[0].reset()
}

const updateOneSession = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log("begin, api-updateOneSession: data")
  console.log(data)
  console.log('end, api-updateOneSession: data')
  api.updateOneSession(data)
    .then(ui.onUpdateOneSessionSuccess)
    .catch(ui.otherError)
  $("#update-one-session-form")[0].reset()
}

const deleteOneSession = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.deleteOneSession(data)
    .then(ui.onDeleteOneSessionSuccess)
    .catch(ui.otherError)
  $("#delete-one-session-form")[0].reset()
}

const tabbedFormSignUp = function(event) {
  event.preventDefault()
  $("login").removeClass("select")
  $("signup").addClass('select')
  $("#login-box").slideUp()
  $("#signup-box").slideDown()
}

const tabbedFormLogin = function(event) {
  event.preventDefault()
  $("signup").removeClass("select")
  $("login").addClass('select')
  $("#signup-box").slideUp()
  $("#login-box").slideDown()
}


const addHandlers = () => {
  $('#sign-up-form').on('submit', signUp)
  $('#sign-in-form').on('submit', signIn)
  // $('#changePass').on('submit', seePasswordForm)
  $('#change-password-form').on('submit', changePassword)
  $('#sign-out-form').on('click', signOut)
  $('#see-all-doctors-form').on('submit', seeAllDoctors)
  $('#see-all-sessions-form').on('submit', seeAllSessions)
  $('#create-one-session-form').on('submit', createOneSession)
  $('#see-one-session-form').on('submit', seeOneSession)
  $('#update-one-session-form').on('submit', updateOneSession)
  $('#delete-one-session-form').on('submit', deleteOneSession)
  $('#signup').on('click', tabbedFormSignUp)
  $('#login').on('click', tabbedFormLogin)
}

module.exports = {
  addHandlers
}

