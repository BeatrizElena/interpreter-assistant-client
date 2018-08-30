const store = require('./store.js')

const onSignUpSuccess = function(data) {
    $("signup").removeClass("select")
    $("login").addClass('select')
    $("#signup-box").slideUp()
    $("#login-box").slideDown()
  }

const onSignInSuccess = function(data) {
  $('.welcome-message').html('')
  $(".see-all-doctors-div").html('')
  const showHTML = (`
      <br>
      <hr>
      <h2 id="welcome">Welcome to your Interpreter Assistant</h2>
      <hr>
    `)
  $(".welcome-message").html(showHTML)
  $('.show-after-login').show()
  $("tab-box").css("display", "none")
  // $(".signup").css("display", "none")
  // $(".signin").css("display", "none")
  $(".user").css("display", "none")
  $(".resources").css("display", "flex")
  store.user = data.user
}

const onChangePwSuccess = function() {
  $('.message').html('')
  const showHTML = (`
      <h4>Password change was successful</h4>
      <br>
    `)
  $(".message").html(showHTML)
  $(".message").fadeOut("slow")
}

const onSignOutSuccess = function() {
  $(".message").html('')
  const showHTML = (`
  <h4>User Logged out</h4>
  <p>Thank you for using Interpreter Assistant! Come back soon!</p>
  `)
  $(".message").html(showHTML)
  $(".message").fadeOut("slow")
  $("tab-box").css("display", "flex")
  $(".user").css("display", "flex")
  $(".resources").css("display", "none")
}

// Doctor UI: See all doctors (ToDo: By clinic)
  const onGetAllDoctorsSuccess = function(data) {
$(".see-all-doctors-div").html(' ')
  for (let i = 0; i < data.doctors.length; i++) {
    const showHTML = (`
      <h4> List of Doctors</h4>
      <p><small>Use the doctor's ID to create a session with your own notes</small></p>
      <p>${data.doctors[i].first_name} ${data.doctors[i].last_name}, ${data.doctors[i].title}, ${data.doctors[i].phone} || Clinic: ${data.doctors[i].clinic.abbreviation} (${data.doctors[i].clinic.name}) || Id: ${data.doctors[i]._id}<br />
      Clinic Information:<br />
      <small>${data.doctors[i].clinic.description}</small></p>
      <hr>
    `)
    // console.log(showHTML)
    $(".see-all-sessions").hide()
    $('.see-created-session').hide()
    $(".see-one-session").hide()
    $('.see-updated-session').hide
    $(".see-all-doctors-div").append(showHTML)
  }
}

const stringTemplate = function(sessionString) {
  return `<p>Session with ${sessionString.doctor.first_name} ${sessionString.doctor.last_name}, ${sessionString.doctor.title}, ${sessionString.doctor.phone}<br />
    My Notes (<small>Written on: ${sessionString.createdAt}</small>):<br />
    <small>${sessionString.notes}</small></p>
    <p><small>Session Id: ${sessionString._id} || Doctor Id: ${sessionString.doctor._id}</small></p>
    <hr>`
}
// Sessions UI
const onGetAllSessionsSuccess = function(data) {
  // console.log(data)
  // console.log(data.sessions)
  // $(".see-all-sessions-div").html(' ')
  // loop through API data
  $(".see-all-sessions-div").html(`
  <h4>My Sessions</h4>
  <p><small>Use the session's ID to see, update, or delete one of your sessions</small></p>
  `)
  
  console.log("before for loop")
  for (let i = 0; i < data.sessions.length; i++) {
    console.log('in loop')
    const sessionString = data.sessions[i]
    //const showHTML = ()
    $(".see-all-sessions-div").append(`<p>Session with ${sessionString.doctor.first_name} ${sessionString.doctor.last_name}, ${sessionString.doctor.title}, ${sessionString.doctor.phone}<br />
    My Notes (<small>Written on: ${sessionString.createdAt}</small>):<br />
    <small>${sessionString.notes}</small></p>
    <p><small>Session Id: ${sessionString._id} || Doctor Id: ${sessionString.doctor._id}</small></p>
    <hr>`)
    $(".see-all-sessions-div").show()
    $(".see-all-doctors-div").hide()
    $('.see-created-session').hide()
    $(".see-one-session").hide()
    $('.see-updated-session').hide()
  }
  // DANGER CODE NEVER GETS HERE
}

const onCreateOneSessionSuccess = function (data) {
  console.log(data)
  const create_content = 'see-created-session-div'
  store.session = data.sessions
  $(create_content).html('')
  const showHTML = (`
    <h6>My Notes with <h5>${store.sessions.doctor.first_name} ${store.session.doctor.last_name}, ${store.session.doctor.title}, ${store.session.doctor.phone}, ${store.session.doctor.clinic}</h6>
    <p>Session Created On: ${data.sessions.createdAt}</p>
    <p>${store.sessions.notes}</p>
    <p>Session ID: ${store.sessions.id}, Doctor ID: ${data.session.doctor.id}</p>
    <p>${store.sessions.doctor.disease}</p>    
  `)
  $(create_content).append(showHTML).show()
  $('.see-all-doctors').hide()
  $(".see-all-sessions").hide()
  $(".see-one-session").hide()
  $('.see-updated-session').hide()
  // empty values from form fields
  // $("input[type=text], textarea").val("")
}

const onSeeOneSessionSuccess = function (data) {
  // console.log(data.session)
  // console.log(data.session.doctor.first_name)
  $(".see-one-session-div").html(' ')
  const showHTML = (`
      <p>My Session Notes for: ${data.session.doctor.first_name} ${data.session.doctor.last_name}, ${data.session.doctor.title}, ${data.session.doctor.phone}<br />
      <small>Session Created On: ${data.session.createdAt}</small></p>
      <p><small>${data.session.notes}</small></p>
      <hr>
    `)
    $(".see-all-sessions-div").hide()
    $('.see-all-doctors-div').hide()
    // $('.see-updated-session').hide()    
    $(".see-one-session-div").append(showHTML) 
}

const onUpdateOneSessionSuccess = function (data) {
  store.session = data.session
  const selector = '.see-updated-session-div'
  $('.see-updated-session-div').html('')
  const showHTML = (`
    <h6>My Notes with <h5>${store.session.doctor.first_name} ${store.session.doctor.last_name}, ${store.session.doctor.title}, ${store.session.doctor.phone}, ${store.session.doctor.clinic}</h6>
    <p>Session Created On: ${data.session.createdAt}</p>
    <p>${store.session.notes}</p>
    <p>Session ID: ${store.session.id}, Doctor ID: ${data.doctor.id}</p>
    <p>${store.session.doctor.disease}</p> 
  `)
  $(selector).append(showHTML).show().addClass("flash")
  $('.see-all-doctors-div').hide()
  $(".see-all-sessions-div").hide()
  $(".see-one-session-div").hide()
  $('.see-updated-session-div').hide()
}

const onDeleteOneSessionSuccess = function () {
  $('.deleted-message').html('')
  const showHTML = (`
    <p>'Session successfully deleted'</p>
    <br>
  `)
  $('.deleted-message').append(showHTML)
  // $('.deleted-message').fadeOut("slow")
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
