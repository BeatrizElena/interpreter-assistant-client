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
      <p>${data.doctors[i].first_name} ${data.doctors[i].last_name}, ${data.doctors[i].title}, ${data.doctors[i].phone} || Clinic: ${data.doctors[i].clinic.abbreviation} (${data.doctors[i].clinic.name}) || Id: ${data.doctors[i]._id}</p>
    `)      
    $(".see-all-doctors").append(showHTML)
  }
  
}


// Sessions UI

const onGetAllSessionsSuccess = function(data) {
  $('.modal-body-session').html('')
  $("#oneModalLabel").html('Success!')
  console.log(data)

  const showHTMLHeaders = (`
  <h4>My Sessions</h4>
  <div id="table">
    <div class="tr">
      <span class="th">Session ID / Doctor ID</span>
      <span class="th">Date</span>
      <span class="th">Doctor</span>
      <span class="th">Clinic</span>
      <span class="th">Phone</span>
      <span class="th">My Notes</span>
    </div>
  </div>
  `)

  $(".modal-body").append(showHTMLHeaders)
  // loop through API data
  data.sessions.forEach(session => {
    // build HTML element with data
    const showHTML = (`
    <div class="tr" data-id="${session._id} / ${session.doctor}">
      <span class="td">
      <h5>
      ${session.doctor.first_name} ${session.doctor.last_name} ${session.doctor.title}
      </h5>
      </span>
      <span class="td"> 
      ${store.session.doctor.clinic}
      </span>
      <span class="td"> 
      ${session.doctor.phone}
      </span>
      <span class="td">
      ${session.notes}
      </span>
    </div>
    `)
    $("#table").append(showHTML)
  })

  $("#oneModalSession").modal('show')
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
  onUpdateSuccess,
  onDeleteSuccess,
  userAuthError,
  otherError
}
