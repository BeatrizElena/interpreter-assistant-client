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
  // $("#sign-up")[0].reset()
}

const signIn = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.userAuthError)
  // $("#sign-in")[0].reset()
}

const changePassword = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.changePassword(data)
    .then(ui.onChangePwSuccess)
    .catch(ui.userAuthError)
  // $("#change-pw-form")[0].reset()
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
  // $("#index-items-form")[0].reset()
}

// Session Actions
const seeAllSessions = function(event) {
  event.preventDefault()
  api.getAllSessions()
    .then(ui.onGetAllSessionsSuccess)
    .catch(ui.otherError)
  // $("#index-items-form")[0].reset()
}

const createOneSession = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createOneSession(data)
    .then(ui.onCreateOneSessionSuccess)
    .catch(ui.otherError)
  // $("#create-form")[0].reset()
}

const seeOneSession = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.seeOneSession(data)
    .then(ui.onSeeOneSessionSuccess)
    .catch(ui.otherError)
  // $("#see-one-form")[0].reset()
}

const updateOneSession = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.updateOneSession(data)
    .then(ui.onUpdateOneSessionSuccess)
    .catch(ui.otherError)
  // $("#update-form")[0].reset()
}

const deleteOneSession = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.deleteOneSession(data)
    .then(ui.onDeleteOneSessionSuccess)
    .catch(ui.otherError)
  // $("#delete-form")[0].reset()
}

const addHandlers = () => {
  $('#sign-up-form').on('submit', signUp)
  $('#sign-in-form').on('submit', signIn)
  $('#change-password-form').on('submit', changePassword)
  $('#sign-out-form').on('click', signOut)
  $('#see-all-doctors-form').on('submit', seeAllDoctors)
  $('#see-all-sessions').on('click', seeAllSessions)
  $('#create-one-session').on('submit', createOneSession)
  $('#search-one-session').on('submit', seeOneSession)
  $('#update-one-session').on('submit', updateOneSession)
  $('#delete-one-session').on('submit', deleteOneSession)
}

module.exports = {
  addHandlers
}

/*

const createOneDoctor = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createDoctorItem(data)
    .then(ui.onCreateOneDoctorSuccess)
    .catch(ui.otherError)
  // $("#create-form")[0].reset()
}

const seeOneDoctor = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.seeOneInventoryItem(data)
    .then(ui.onSeeOneDoctorSuccess)
    .catch(ui.otherError)
  // $("#see-one-form")[0].reset()
}

const updateOneDoctor = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.updateOneDoctor(data)
    .then(ui.onUpdateOneDoctorSuccess)
    .catch(ui.otherError)
  // $("#update-form")[0].reset()
}

const deleteOneDoctor = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.deleteOneDoctor(data)
    .then(ui.onDeleteOneDoctorSuccess)
    .catch(ui.otherError)
  // $("#delete-form")[0].reset()
}



// Clinic Actions
const seeAllClinics = function(event) {
  event.preventDefault()
  api.getAllClinics()
    .then(ui.onGetAllClinicsSuccess)
    .catch(ui.otherError)
  // $("#index-items-form")[0].reset()
}

const createOneClinic = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createOneClinic(data)
    .then(ui.onCreateOneClinicSuccess)
    .catch(ui.otherError)
  // $("#create-clinic")[0].reset()
}

const seeOneClinic = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.seeOneClinic(data)
    .then(ui.onSeeOneClinicSuccess)
    .catch(ui.otherError)
  // $("#see-one-form")[0].reset()
}

const updateOneClinic = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.updateOneClinic(data)
    .then(ui.onUpdateOneClinicSuccess)
    .catch(ui.otherError)
  // $("#update-form")[0].reset()
}

const deleteOneClinic = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.deleteOneClinic(data)
    .then(ui.onDeleteOneClinicSuccess)
    .catch(ui.otherError)
  // $("#delete-form")[0].reset()
}


// Disease Actions
const seeAllDiseases = function(event) {
  event.preventDefault()
  api.getAllClinics()
    .then(ui.onGetAllClinicsSuccess)
    .catch(ui.otherError)
  // $("#index-items-form")[0].reset()
}

const createOneDisease = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createOneDisease(data)
    .then(ui.onCreateOneDiseaseSuccess)
    .catch(ui.otherError)
  // $("#create-form")[0].reset()
}

const seeOneDisease = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.seeOneDisease(data)
    .then(ui.onSeeOneDiseaseSuccess)
    .catch(ui.otherError)
  // $("#see-one-form")[0].reset()
}

const updateOneDisease = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.updateOneDisease(data)
    .then(ui.onUpdateOneDiseaseSuccess)
    .catch(ui.otherError)
  // $("#update-form")[0].reset()
}

const deleteOneDisease = function(event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.deleteOneDisease(data)
    .then(ui.onDeleteOneDiseaseSuccess)
    .catch(ui.otherError)
  // $("#delete-form")[0].reset()
}



$('#create-doctors').on('submit', createOneDoctor)
$('#search-one-doctor').on('submit', seeOneDoctor)
$('#doctor-update').on('submit', updateOneDoctor)
$('#delete-one-doctor').on('submit', deleteOneDoctor)
$('#see-all-clinics').on('click', seeAllClinics)
$('#create-one-clinic').on('submit', createOneClinic)
$('#search-one-clinic').on('submit', seeOneClinic)
$('#update-one-clinic').on('submit', updateOneClinic)
$('#delete-one-clinic').on('submit', deleteOneClinic)
$('#see-all-diseases').on('click', seeAllDiseases)
$('#create-one-disease').on('submit', createOneDisease)
$('#search-one-disease').on('submit', seeOneDisease)
$('#update-one-disease').on('submit', updateOneDisease)
$('#delete-one-disease').on('submit', deleteOneDisease)
*/

