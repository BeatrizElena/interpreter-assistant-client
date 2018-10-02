const store = require('./store.js')

const onSignUpSuccess = function(data) {
  $('#message').html('')
  $("#message").append('Account Created. Log in to use Interpreter Assistant.').show()
    .delay(1800).fadeOut()
  $(".form1").css("display", "none")
  }

const onSignInSuccess = function(data) {
  $('#message').html('')
  $("#message").append('Welcome to your Interpreter Assistant').show()
    .delay(1800).fadeOut()
  $('#create-account-heading').css("display", "none")
  $(".form1").css("display", "none")
  $(".form2").css("display", "none")
  $(".show-after-login").css("display", "flex")

  store.user = data.user
}

const onChangePwSuccess = function() {
  $('#message').html('')
  $("#message").append('Password change was successful').show()
    .delay(1800).fadeOut()
}

const onSignOutSuccess = function() {
  $('#message').html('')
  $("#message").append('User Logged out. Thank you for using Interpreter Assistant! Come back soon!').show()
    .delay(1800).fadeOut() 
  $(".show-after-login").css("display", "none")
  $("#show-data").css("display", "none")
  $(".form1").css("display", "flex")
  $(".form2").css("display", "flex")
}

// Doctor UI: See all doctors (ToDo: By clinic)
  const onGetAllDoctorsSuccess = function(data) {
    $('#show-data').html('')
    const showTableHeaders = (`
      <table>
      <tr>
        <th>Provider's Name</th>
        <th>Provider's Phone</th>
        <th>Clinic</th>
        <th>Id number</th>
      </tr>
      </table>
      `)
      $("#show-data").append(showTableHeaders).show()
    for (let i = 0; i < data.doctors.length; i++) {
      // console.log(data)
      // console.log(data.doctors)
      // console.log(data.doctors[i].clinic)
      // console.log(data.doctors[i].disease)
      // console.log(data.doctors[i].clinic.name)
      const showHTML = (`
      <table>
        <tr>
          <td>${data.doctors[i].first_name} ${data.doctors[i].last_name}, ${data.doctors[i].title}</td>
          <td>${data.doctors[i].phone}</td>
          <td>${data.doctors[i].clinic.name} (${data.doctors[i].clinic.abbreviation})</td>
          <td>${data.doctors[i]._id}</td>
        </tr>
      </table>
      `)
      $("#show-data").append(showHTML).show()
  }
}

// Sessions UI
const onGetAllSessionsSuccess = function(data) {
  $('#show-data').html('')
    const showTableHeaders = (`
      <table id="sessions-table">
      <tr>
        <th>Provider</th>
        <th>Notes</th>
        <th>Other Info</th>
      </tr>
      </table>
      `)
      $("#show-data").append(showTableHeaders).show()
  for (let i = 0; i < data.sessions.length; i++) {
    const sessionString = data.sessions
    // console.log(sessionString)
    const showHTML = (`
      <table>
        <tr>
          <td>${sessionString[i].doctorReference.first_name} ${sessionString[i].doctorReference.last_name}, ${sessionString[i].doctorReference.title}<br />
          ${sessionString[i].doctorReference.phone}</td>
          <td>${sessionString[i].notes}</td>
          <td>Notes created on: ${sessionString[i].createdAt}<br />
          Doctor id: ${sessionString[i].doctorReference._id}<br />
          Session id: ${sessionString[i]._id}</td>
        </tr>
      </table>
      `)
      $("#show-data").append(showHTML).show()
  }
  // DANGER CODE NEVER GETS HERE
}

const onCreateOneSessionSuccess = function (data) {
  $('#message').html('')
  $("#message").append('Session successfully created').show()
    .delay(1800).fadeOut()
  // empty values from form fields
  // $("input[type=text], textarea").val("")
}

const onSeeOneSessionSuccess = function (data) {
  const sessionString = data.session
  // console.log(data)
  $('#show-data').html('')
    const showTableHeaders = (`
      <table id="sessions-table">
      <tr>
        <th>Provider</th>
        <th>Notes</th>
        <th>Other Info</th>
      </tr>
      </table>
      `)
      $("#show-data").append(showTableHeaders).show()
      const showHTML = (`
      <table>
        <tr>
          <td>${sessionString.doctorReference.first_name} ${sessionString.doctorReference.last_name}, ${sessionString.doctorReference.title}<br />
          ${sessionString.doctorReference.phone}</td>
          <td>${sessionString.notes}</td>
          <td>Notes created on: ${sessionString.createdAt}<br />
          Doctor id: ${sessionString.doctorReference._id}<br />
          Session id: ${sessionString._id}</td>
        </tr>
      </table>
      `)
      $("#show-data").append(showHTML).show() 
}

const onUpdateOneSessionSuccess = function (data) {
  // store.session = data.session
  $('#message').html('')
  const showHTML = (`
    <p>Session was updated successfully</p> 
  `)
  $("#message").append(showHTML).show()
    .delay(1800).fadeOut()
}

const onDeleteOneSessionSuccess = function () {
  $('#message').html('')
  const showHTML = (`
    <p>'Session successfully deleted'</p>
    <br>
  `)
  $("#message").append(showHTML).show()
    .delay(1800).fadeOut()
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
      .delay(1600).fadeOut()
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
      .delay(1600).fadeOut()
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
