const store = require('./store.js')

const onSignUpSuccess = function(data) {
  $('.modal-body').html('')
  $("#myModalLabel").html('Account Created')
  const showHTML = (`
    <p>Log in to use Interpreter Assistant</p>
    <br>
  `)
  $(".modal-body").html(showHTML)
  $("#myModal").modal('show')
  $(".form1").css("display", "none")
  }

const onSignInSuccess = function(data) {
  $('.modal-body').html('')
  $("#myModalLabel").html('You\'re logged-in' )
  const showHTML = (`
      <h4>Welcome to your Interpreter Assistant</h4>
    `)
  $(".modal-body").html(showHTML)
  $("#myModal").modal('show')
  $(".form1").css("display", "none")
  $(".form2").css("display", "none")
  $(".user-dash").css("display", "flex")
  $(".flex-container").css("display", "flex")

  store.user = data.user
}

const onChangePwSuccess = function() {
  $('.modal-body').html('')
  $("#myModalLabel").html('Successful action')
  const showHTML = (`
      <h4>Password change was successful</h4>
      <br>
    `)
    $(".modal-body").html(showHTML)
    $("#myModal").modal('show')
}

const onSignOutSuccess = function() {
  $('.modal-body').html('')
  $("#myModalLabel").html('Successful action')
  const showHTML = (`
  <h4>User Logged out</h4>
  <p>Thank you for using Interpreter Assistant! Come back soon!</p>
  `)
  $(".modal-body").html(showHTML)
  $("#myModal").modal('show')
  $(".user-dash").css("display", "none")
  $(".flex-container").css("display", "none")
  $(".form1").css("display", "flex")
  $(".form2").css("display", "flex")
}

// Doctor UI: See all doctors (ToDo: By clinic)
  const onGetAllDoctorsSuccess = function(data) {
    $('.modal-body').html('')
    $("#myModalLabel").html('Successful action')
    for (let i = 0; i < data.doctors.length; i++) {
      console.log(data)
      console.log(data.doctors)
      console.log(data.doctors.clinicReference)
      console.log(data.doctors.clinic.name)
      const showHTML = (`
        <p>${data.doctors[i].first_name} ${data.doctors[i].last_name}, ${data.doctors[i].title}, ${data.doctors[i].phone} || Clinic: ${data.doctors[i].clinic.abbreviation} (${data.doctors[i].clinic.name}) || Id: ${data.doctors[i]._id}<br />
        Clinic Information:<br />
        <small>${data.doctors[i].clinic.description}</small></p>
        <hr>
      `)
    // console.log(showHTML)
    $(".modal-body").html(showHTML)
    $("#myModal").modal('show')
  }
}

// Sessions UI
const onGetAllSessionsSuccess = function(data) {
  $('.modal-body').html('')
  $("#myModalLabel").html('Successful action')
  for (let i = 0; i < data.sessions.length; i++) {
    // console.log('in loop')
    const sessionString = data.sessions[i]
    const showHTML = (`
    <p>Session with ${sessionString.doctor.first_name} ${sessionString.doctor.last_name}, ${sessionString.doctor.title}, ${sessionString.doctor.phone}<br />
    My Notes <small>Written on: ${sessionString.createdAt}</small>):<br />
    <small>${sessionString.notes}</small></p>
    <p><small>Session Id: ${sessionString._id} || Doctor Id: ${sessionString.doctor._id}</small></p>
    `)
    $(".modal-body").html(showHTML)
    $("#myModal").modal('show')
  }
  // DANGER CODE NEVER GETS HERE
}

const onCreateOneSessionSuccess = function (data) {
  $('.modal-body').html('')
  $("#myModalLabel").html('Successful action')
  const showHTML = (`
    <h6>My Notes with <h5>${store.sessions.doctor.first_name} ${store.session.doctor.last_name}, ${store.session.doctor.title}, ${store.session.doctor.phone}, ${store.session.doctor.clinic}</h6>
    <p>Session Created On: ${data.sessions.createdAt}</p>
    <p>${store.sessions.notes}</p>
    <p>Session ID: ${store.sessions.id}, Doctor ID: ${data.session.doctor.id}</p>
    <p>${store.sessions.doctor.disease}</p>    
  `)
  $(".modal-body").html(showHTML)
  $("#myModal").modal('show')
  // empty values from form fields
  // $("input[type=text], textarea").val("")
}

const onSeeOneSessionSuccess = function (data) {
  $('.modal-body').html('')
  $("#myModalLabel").html('Successful action')
  const showHTML = (`
      <p>My Session Notes for: ${data.session.doctor.first_name} ${data.session.doctor.last_name}, ${data.session.doctor.title}, ${data.session.doctor.phone}<br />
      <small>Session Created On: ${data.session.createdAt}</small></p>
      <p><small>${data.session.notes}</small></p>
      <hr>
    `)
  $(".modal-body").html(showHTML)
  $("#myModal").modal('show')  
}

const onUpdateOneSessionSuccess = function (data) {
  // store.session = data.session
  $('.modal-body').html('')
  $("#myModalLabel").html('Successful action')
  $(selector).html('')
  const showHTML = (`
    <h6>My Notes with <h5>${store.session.doctor.first_name} ${store.session.doctor.last_name}, ${store.session.doctor.title}, ${store.session.doctor.phone}, ${store.session.doctor.clinic}</h6>
    <p>Session Created On: ${data.session.createdAt}</p>
    <p>${store.session.notes}</p>
    <p>Session ID: ${store.session.id}, Doctor ID: ${data.doctor.id}</p>
    <p>${store.session.doctor.disease}</p> 
  `)
  $(".modal-body").html(showHTML)
  $("#myModal").modal('show')
}

const onDeleteOneSessionSuccess = function () {
  $('.modal-body').html('')
  $("#myModalLabel").html('Successful action')
  const showHTML = (`
    <p>'Session successfully deleted'</p>
    <br>
  `)
  $(".modal-body").html(showHTML)
  $("#myModal").modal('show')
}

  
const userAuthError = function(error) {
  if (error) {
    $('.modal-body').html('')
    $("#myModalLabel").html('Error')
    const showHTML = (`
        <h4>There seems to be something wrong.</h4>
        <p>Please try again</p>
        <br>
      `)
    $(".modal-body").html(showHTML)
    $("#myModal").modal('show')
  }
}

const otherError = function () {
  if (error) {
    $('.modal-body').html('')
    $("#myModalLabel").html('Error')
    const showHTML = (`
        <h4>Something went wrong. Perhaps you didn\'t enter a valid doctor id.</h4>
        <p>Please try again.</p>
        <br>
      `)
    $(".modal-body").html(showHTML)
    $("#myModal").modal('show')
  }
// empty values from form fields
// $("input[type=text], textarea").val("")
}

module.exports = {
  onSignUpSuccess,
  onSignInSuccess,
  // onShowPasswordFormSuccess,
  onChangePwSuccess,
  onSignOutSuccess,
  onGetAllDoctorsSuccess,
  onGetAllSessionsSuccess,
  onCreateOneSessionSuccess,
  onSeeOneSessionSuccess,
  onUpdateOneSessionSuccess,
  onDeleteOneSessionSuccess,
  userAuthError,
  otherError
}
