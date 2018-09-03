const store = require('./store.js')

const onSignUpSuccess = function(data) {
  $('#message').html('')
  $("#message").append('Account Created. Log in to use Interpreter Assistant.').show()
    .delay(2000).fadeOut()
  $(".form1").css("display", "none")
  }

const onSignInSuccess = function(data) {
  $('#message').html('')
  $("#message").append('Welcome to your Interpreter Assistant').show()
    .delay(2000).fadeOut()
  $(".form1").css("display", "none")
  $(".form2").css("display", "none")
  $(".show-after-login").css("display", "flex")

  store.user = data.user
}

const onChangePwSuccess = function() {
  $('#message').html('')
  $("#message").append('Password change was successful').show()
    .delay(2000).fadeOut()
}

const onSignOutSuccess = function() {
  $('#message').html('')
  $("#message").append('User Logged out. Thank you for using Interpreter Assistant! Come back soon!').show()
    .delay(2000).fadeOut() 
  $(".show-after-login").css("display", "none")
  $(".form1").css("display", "flex")
  $(".form2").css("display", "flex")
}

// Doctor UI: See all doctors (ToDo: By clinic)
  const onGetAllDoctorsSuccess = function(data) {
    $('#show-data').html('')
    for (let i = 0; i < data.doctors.length; i++) {
      // console.log(data)
      // console.log(data.doctors)
      // console.log(data.doctors.clinicReference)
      // console.log(data.doctors.clinic.name)
      const showHTML = (`
      <p>${data.doctors[i].first_name} ${data.doctors[i].last_name}, ${data.doctors[i].title}, ${data.doctors[i].phone} || Id: ${data.doctors[i]._id}<br />
      <hr>
      `)
      $("#show-data").append(showHTML).show()
  }
}

// const showHTML = (`
//         <p>${data.doctors[i].first_name} ${data.doctors[i].last_name}, ${data.doctors[i].title}, ${data.doctors[i].phone} || Clinic: ${data.doctors[i].clinic.abbreviation} (${data.doctors[i].clinic.name}) || Id: ${data.doctors[i]._id}<br />
//         Clinic Information:<br />
//         <small>${data.doctors[i].clinic.description}</small></p>
//         <hr>
//       `)

// Sessions UI
const onGetAllSessionsSuccess = function(data) {
  $('#show-data').html('')
  for (let i = 0; i < data.sessions.length; i++) {
    // console.log('in loop')
    const sessionString = data.sessions
    console.log(sessionString)
    const showHTML = (`
    <p>Session with ${sessionString[i].doctorReference.first_name} ${sessionString[i].doctorReference.last_name}, ${sessionString[i].doctorReference.title}, ${sessionString[i].doctorReference.phone}<br />
    My Notes <small>Written on: ${sessionString[i].createdAt}</small>):<br />
    <small>${sessionString[i].notes}</small></p>
    <p><small>Session Id: ${sessionString[i].doctorReference._id} || Doctor Id: ${sessionString[i].doctorReference._id}</small></p>
    `)
    $("#show-data").append(showHTML).show()
  }
  // DANGER CODE NEVER GETS HERE
}

const onCreateOneSessionSuccess = function (data) {
  $('#message').html('')
  // const showHTML = (`
  //   <h6>My Notes with <h5>${store.sessions.doctor.first_name} ${store.session.doctor.last_name}, ${store.session.doctor.title}, ${store.session.doctor.phone}</h6>
  //   <p>Session Created On: ${data.sessions.createdAt}</p>
  //   <p>${store.sessions.notes}</p>
  //   <p>Session ID: ${store.sessions.id}, Doctor ID: ${data.session.doctor.id}</p>
  //   <p>${store.sessions.doctor.disease}</p>    
  // `)
  $("#message").append('Session successfully created').show()
    .delay(2000).fadeOut()
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
  $('#message').html('')
  $(selector).html('')
  const showHTML = (`
    <p>Session was updated successfully</p> 
  `)
  $("#message").append(showHTML).show()
    .delay(2000).fadeOut()
}

const onDeleteOneSessionSuccess = function () {
  $('#message').html('')
  const showHTML = (`
    <p>'Session successfully deleted'</p>
    <br>
  `)
  $("#message").append(showHTML).show()
    .delay(2000).fadeOut()
}

  
const userAuthError = function(error) {
  if (error) {
    $('#message').html('')
    const showHTML = (`
        <h4>There seems to be something wrong.</h4>
        <p>Please try again</p>
        <br>
      `)
      $("#message").append(showHTML).show()
      .delay(2000).fadeOut()
  }
}

const otherError = function () {
  if (error) {
    $('#message').html('')
    const showHTML = (`
        <h4>Something went wrong. Perhaps you didn\'t enter a valid doctor id.</h4>
        <p>Please try again.</p>
        <br>
      `)
      $("#message").append(showHTML).show()
      .delay(2000).fadeOut()
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
