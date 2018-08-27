const store = require('./store.js')
const w3 = require('./w3.js')

const onSignUpSuccess = function(data) {
    $("signup").removeClass("select")
    $("login").addClass('select')
    $("#signup-box").slideUp()
    $("#login-box").slideDown()
  }

const onSignInSuccess = function(data) {
  $('#message').html('')
  const showHTML = (`
      <h4>Welcome to your ReadyInterpreter App</h4>
      <hr>
      <br>
    `)
  $("#message").html(showHTML)
  $("tab-box").css("display", "none")
  // $(".signup").css("display", "none")
  // $(".signin").css("display", "none")
  $(".user").css("display", "none")
  $(".resources").css("display", "flex")
  store.user = data.user
}

const onChangePwSuccess = function() {
  $('.modal-body').html('')
  $("#oneModalLabel").html('Success!')
  const showHTML = (`
      <h4>Password change was successful</h4>
      <br>
    `)
  $(".modal-body").html(showHTML)
  $("#oneModal").modal('show')
}

const onSignOutSuccess = function() {
  $('.modal-body').html('')
  $("#oneModalLabel").html('Success!')
  const message = (`
  <h4>User Logged out</h4>
  <p>Thank you for using Interpreter Assistant! Come back soon!</p>
  `)
  $(".modal-body").html(message)
  $("#oneModal").modal('show')
}

// Doctor UI: See all doctors (ToDo: By clinic)
  const onGetAllDoctorsSuccess = function(data) {
$(".see-all-doctors").html(' ')
  // console.log(data.doctors)
  // console.log(data.doctors[0].first_name)
  // console.log(data.doctors[0].clinic.name)
  for (let i = 0; i < data.doctors.length; i++) {
    const showHTML = (`
      <p>${data.doctors[i].first_name} ${data.doctors[i].last_name}, ${data.doctors[i].title}, ${data.doctors[i].phone} || Clinic: ${data.doctors[i].clinic.abbreviation} (${data.doctors[i].clinic.name}) || Id: ${data.doctors[i]._id}<br />
      Clinic Information:<br />
      <small>${data.doctors[i].clinic.description}</small></p>
      <hr>
    `)      
    $(".see-all-doctors").append(showHTML)
  }
}

// Sessions UI
const onGetAllSessionsSuccess = function(data) {
  $(".see-all-sessions").html(' ')
  // console.log(data.sessions)
  // console.log(data.sessions[0].doctor.first_name)
  // console.log(data.sessions[0].doctor.last_name)
  // console.log(data.sessions[0].notes)
  // loop through API data
  for (let i = 0; i < data.sessions.length; i++) {
    const showHTML = (`
      <p>${data.sessions[i].doctor.first_name} ${data.sessions[i].doctor.last_name}, ${data.sessions[i].doctor.title}, ${data.sessions[i].doctor.phone} || Id: ${data.sessions[i]._id}<br />
      My Session Notes:<br />
      <small>${data.sessions[i].notes}</small></p>
      <hr>
    `)      
    $(".see-all-sessions").append(showHTML)
  }
}

const onCreateOneSessionSuccess = function (data) {
  store.session = data.session
  // console.log(data)
  $('#modal-body-session').html('')
  const showHTML = (`
    <p>Session ID: ${store.session.id}, Doctor ID: ${data.doctor.id}</p>
    <h5>${store.session.doctor.first_name} ${store.session.doctor.last_name}, ${store.session.doctor.title}, ${store.session.doctor.clinic}</h5>
    <h6>Phone Number: ${store.session.doctor.phone}</h6>
    <p>${store.session.doctor.disease}</p>
    <h6>My Notes</h6>
    <p>${store.session.notes}</p>
  `)
  $('.modal-body-session').append(showHTML)
  $("#oneModalSession").modal('show')
  // empty values from form fields
  $("input[type=text], textarea").val("")
}

const onSeeOneSessionSuccess = function (data) {
  console.log(data.session)
  console.log(data.session.doctor.first_name)
  $(".see-one-session").html(' ')
  const showHTML = (`
      <p>${data.session.doctor.first_name} ${data.session.doctor.last_name}, ${data.session.doctor.title}, ${data.session.doctor.phone}<br />
      Session Created On: ${data.session.createdAt}<br />
      My Session Notes:<br />
      <small>${data.session.notes}</small></p>
      <hr>
    `)      
    $(".see-one-session").append(showHTML)
}

const onUpdateSuccess = function (data) {
  // console.log('You successfully updated the doctor!')
  store.session = data.session
  $('#update-one-session-content').html('')
  const showHTML = (`
    <p>Session ID: ${store.session.id}, Doctor ID: ${store.session.doctor.id}</p>
    <h6>Dr. ${store.session.doctor.first_name} ${store.session.doctor.last_name},  ${store.session.doctor.clinic_affiliation},  Main Phone:  ${store.session.doctor.phone_number}</h6>
    <p>Notes: ${store.session.notes}</p>
    <br>
  `)
  $('#update-one-session-content').append(showHTML)
  $("#oneModalSession").modal('show')
}

const onDeleteSuccess = function () {
  const showHTML = (`
    <p>'Session successfully deleted'</p>
    <br>
  `)
  $('#update-one-session-content').append(showHTML)
  $("#oneModal").modal('show')
}

  
const userAuthError = function(error) {
  if (error) {
    $('.modal-body').html('')
    $("#oneModalLabel").html('Error')
    const showHTML = (`
        <h4>There seems to be something wrong.</h4>
        <p>Please try again</p>
        <br>
      `)
    $(".modal-body").html(showHTML)
    $("#oneModal").modal('show')
  }
}

const otherError = function () {
  if (error) {
    $('.modal-body').html('')
    $("#oneModalLabel").html('Error')
    const showHTML = (`
        <h4>Something went wrong. Perhaps you didn\'t enter a valid doctor id.</h4>
        <p>Please try again.</p>
        <br>
      `)
    $(".modal-body").html(showHTML)
    $("#oneModal").modal('show')
  }
// empty values from form fields
$("input[type=text], textarea").val("")
}

module.exports = {
  onSignUpSuccess,
  onSignInSuccess,
  onChangePwSuccess,
  onSignOutSuccess,
  onGetAllDoctorsSuccess,
  onGetAllSessionsSuccess,
  onCreateOneSessionSuccess,
  onSeeOneSessionSuccess,
  onUpdateSuccess,
  onDeleteSuccess,
  userAuthError,
  otherError
}
