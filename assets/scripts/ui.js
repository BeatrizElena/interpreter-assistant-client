const store = require('./store.js')
const w3 = require('./w3.js')

const onSignUpSuccess = function(data) {
    $("signup").removeClass("select")
    $("login").addClass('select')
    $("#signup-box").slideUp()
    $("#login-box").slideDown()
  }

const onSignInSuccess = function(data) {
  $('.message').html('')
  const showHTML = (`
      <h2 id="welcome">Welcome to your Interpreter Assistant</h2>
      <hr>
      <br>
    `)
  $(".message").html(showHTML)
  $("tab-box").css("display", "none")
  // $(".signup").css("display", "none")
  // $(".signin").css("display", "none")
  $(".user").css("display", "none")
  $(".resources").css("display", "flex")
  store.user = data.user
}

const onShowPasswordFormSuccess = function() {
  $('.change-password-div').html('')
  $(".message").html('')
  const showHTML = (`
    <form class="form-inline border" id="change-password-form">
    <input type="password" name="passwords[old]" placeholder="Old-Password">
    <input type="password" name="passwords[new]" placeholder="New-Password">
    <div class="form-group col-md-12">
      <button type="submit" id="changePassword" class="btn btn-info btn-sm">Change Password</button>
    </div>
    </form>
    <hr>
    `)
  $(".change-password-div").html(showHTML)
  $(".message").fadeOut("slow")
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
  $("#oneModalLabel").html('Success!')
  const showHTML = (`
  <h4>User Logged out</h4>
  <p>Thank you for using Interpreter Assistant! Come back soon!</p>
  `)
  $(".message").html(showHTML)
  $(".message").fadeOut("slow")
}

// Doctor UI: See all doctors (ToDo: By clinic)
  const onGetAllDoctorsSuccess = function(data) {
$(".see-all-doctors").html(' ')
  for (let i = 0; i < data.doctors.length; i++) {
    const showHTML = (`
      <p>${data.doctors[i].first_name} ${data.doctors[i].last_name}, ${data.doctors[i].title}, ${data.doctors[i].phone} || Clinic: ${data.doctors[i].clinic.abbreviation} (${data.doctors[i].clinic.name}) || Id: ${data.doctors[i]._id}<br />
      Clinic Information:<br />
      <small>${data.doctors[i].clinic.description}</small></p>
      <hr>
    `)
    // $(".see-all-sessions").hide()
    // $('.see-created-session').hide()
    // $(".see-one-session").hide()
    // $('.see-updated-session').hide
    $(".see-all-doctors").append(showHTML)
  }
}

// Sessions UI
const onGetAllSessionsSuccess = function(data) {
  $(".see-all-sessions").html(' ')
  // loop through API data
  for (let i = 0; i < data.sessions.length; i++) {
    const showHTML = (`
      <p>Session with ${data.sessions[i].doctor.first_name} ${data.sessions[i].doctor.last_name}, ${data.sessions[i].doctor.title}, ${data.sessions[i].doctor.phone}<br />
      My Notes (<small>Written on: ${data.sessions[i].createdAt}</small>):<br />
      <small>${data.sessions[i].notes}</small></p>
      <p><small>Session Id: ${data.sessions[i]._id} || Doctor Id: ${data.sessions[i].doctor._id}</small></p>
      <hr>
    `)      
    $(".see-all-sessions").append(showHTML)
  }
}
{/* <p><small>|| Doctor ID: ${data.doctor[i].id}</small></p> */}
const onCreateOneSessionSuccess = function (data) {
  store.session = data.sessions
  // console.log(data)
  $('.see-created-session').html('')
  const showHTML = (`
    <h6>My Notes with <h5>${store.session.doctor.first_name} ${store.session.doctor.last_name}, ${store.session.doctor.title}, ${store.session.doctor.phone}, ${store.session.doctor.clinic}</h6>
    <p>Session Created On: ${data.session.createdAt}</p>
    <p>${store.session.notes}</p>
    <p>Session ID: ${store.session.id}, Doctor ID: ${data.doctor.id}</p>
    <p>${store.session.doctor.disease}</p>    
  `)
  $('.see-created-session').append(showHTML)
  // empty values from form fields
  // $("input[type=text], textarea").val("")
}

const onSeeOneSessionSuccess = function (data) {
  // console.log(data.session)
  // console.log(data.session.doctor.first_name)
  $(".see-one-session").html(' ')
  const showHTML = (`
      <p>My Session Notes for: ${data.session.doctor.first_name} ${data.session.doctor.last_name}, ${data.session.doctor.title}, ${data.session.doctor.phone}<br />
      <small>Session Created On: ${data.session.createdAt}</small></p>
      <p><small>${data.session.notes}</small></p>
      <hr>
    `)      
    $(".see-one-session").append(showHTML)
}

const onUpdateOneSessionSuccess = function (data) {
  store.session = data.session
  $('.see-updated-session').html('')
  const showHTML = (`
    <h6>My Notes with <h5>${store.session.doctor.first_name} ${store.session.doctor.last_name}, ${store.session.doctor.title}, ${store.session.doctor.phone}, ${store.session.doctor.clinic}</h6>
    <p>Session Created On: ${data.session.createdAt}</p>
    <p>${store.session.notes}</p>
    <p>Session ID: ${store.session.id}, Doctor ID: ${data.doctor.id}</p>
    <p>${store.session.doctor.disease}</p> 
  `)
  $('.see-updated-session').append(showHTML)
}

const onDeleteOneSessionSuccess = function () {
  $('.deleted-message').html('')
  const showHTML = (`
    <p>'Session successfully deleted'</p>
    <br>
  `)
  $('.deleted-message').append(showHTML)
  $('.deleted-message').fadeOut("slow")
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
  onShowPasswordFormSuccess,
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
