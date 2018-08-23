const store = require('./store.js')

const onSignUpSuccess = function(data) {
    $('.modal-body').html('')
    $("#oneModalLabel").html('Success!')
    const showHTML = (`
        <h4>User Registered!</h4>
        <p>Log in to enter your App</p>
        <br>
      `)
    $(".modal-body").html(showHTML)
    $("#oneModal").modal('show')
    $(".form1").css("display", "none")
  }

const onSignInSuccess = function(data) {
  $('.modal-body').html('')
  $("#oneModalLabel").html('Success!')
  const showHTML = (`
      <h4>User Logged In</h4>
      <p>Welcome to your ReadyInterpreter App</p>
      <br>
    `)
  $(".modal-body").html(showHTML)
  $("#oneModal").modal('show')
  $(".form2").css("display", "none")
  $(".form1").css("display", "none")
  $(".user-dash").css("display", "flex")
  $(".flex-container").css("display", "flex")
  $("#image").css("display", "none")
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
  <p>Thank you for using ReadyInterprter! Come back soon!</p>
  `)
  $(".modal-body").html(message)
  $("#oneModal").modal('show')

  $(".user-dash").css("display", "none")
  $(".form1").css("display", "flex")
  $(".form2").css("display", "flex")
  $(".flex-container").css("display", "none")
  $("#image").css("display", "block")
}


// Doctor UI: See all doctors (ToDo: By clinic)
  const onGetAllDoctorsSuccess = function(data) {
  $('.modal-body').html('')
  $("#oneModalLabel").html('')
  console.log(data.doctors)
  const showHTMLHeaders = (`
  <h4>Doctors</h4>
  <div id="table">
    <div class="tr">
      <span class="th">ID</span>
      <span class="th">Name & Title</span>
      <span class="th">Clinic</span>
      <span class="th">Phone</span>
      <span class="th">Disease</span>
    </div>
  </div>
  `)

  $(".modal-body").append(showHTMLHeaders)

  data.doctors.forEach(doctor => {
    // build HTML elements
    const showHTML = (`
      <div class="tr" data-id=${doctor._id}>
        <span class="td">
          ${doctor._id}
        </span>
        <span class="td">
          ${doctor.first_name} ' ' ${doctor.last_name}', ' ${doctor.title}
        </span>
        <span class="td">
          ${doctor.clinic}
        </span>
        <span class="td">
          ${doctor.disease}
        </span>
      </div>
    `)
    $("#table").append(showHTML)
    $("#oneModal").modal('show')
  })
}


// Sessions UI

const onGetAllSessionsSuccess = function(data) {
  $('.modal-body').html('')
  $("#oneModalLabel").html('Success!')
  console.log(data)

  const showHTMLHeaders = (`
  <h4>My Sessions</h4>
  <div id="table">
    <div class="tr">
      <span class="th">Session ID / Doctor ID</span>
      <span class="th">Date</span>
      <span class="th">Doctor</span>
      <span class="th">My Notes</span>
    </div>
  </div>
  `)

  $(".modal-body").append(showHTMLHeaders)
  // loop through API data
  data.sessions.forEach(session => {
    // build HTML element with data
    const showHTML = (`
    <div class="tr" data-id=${store.session.id} / ${store.session.doctor_id}>
      <span class="td"><h5>${store.session.doctor.first_name} ${store.session.doctor.last_name}, ${store.session.doctor.title}, ${store.session.doctor.clinic}</h5></span>
      <span class="td"> ${store.session.doctor.phone}</span>
      <span class="td">${store.session.notes}</span>
    </div>
    `)
    $("#table").append(showHTML)
  })

  $("#oneModal").modal('show')
}

// const onGetAllSessionsSuccess = function (data) {
//   $('#see-all-content').html('')
//   // console.log('data is ', data)
//   // data returns all sessions created by any user
//   if (!data) {
//     $('#see-all-content').html('Either you deleted something, or something went wrong')
//   } else {
//     data
//     // clear content div, in case something is already there
//     $('#see-all-content').html('')
//     data.sessions.forEach(session => {
//       const showHTML = (`
//       <p>Session ID: ${store.session.id}, Doctor ID: ${store.session.doctor_id}</p>
//       <h5>${store.session.doctor.first_name} ${store.session.doctor.last_name}, ${store.session.doctor.title}, ${store.session.doctor.clinic}</h5>
//       <h6>Phone Number: ${store.session.doctor.phone}</h6>
//       <p>${store.session.doctor.disease}</p>
//       <h6>My Notes</h6>
//       <p>${store.session.notes}</p>
//         <br>
//       `)
//       $('#see-all-content').append(showHTML)
//       $("#oneModal").modal('show')
//   })
//   }
// }


const onCreateOneSessionSuccess = function (data) {
  store.session = data.session
  // console.log(data)
  $('#add-session-content').html('')
  const showHTML = (`
    // <p>Date: ${store.session.date_time}</p>
    <p>Session ID: ${store.session.id}, Doctor ID: ${store.session.doctor_id}</p>
    <h5>${store.session.doctor.first_name} ${store.session.doctor.last_name}, ${store.session.doctor.title}, ${store.session.doctor.clinic}</h5>
    <h6>Phone Number: ${store.session.doctor.phone}</h6>
    <p>${store.session.doctor.disease}</p>
    <h6>My Notes</h6>
    <p>${store.session.notes}</p>
  `)
  $('#add-session-content').append(showHTML)
  $("#oneModal").modal('show')
  // empty values from form fields
  $("input[type=text], textarea").val("")
}

const onUpdateSuccess = function (data) {
  // console.log('You successfully updated the doctor!')
  store.session = data.session
  $('#update-one-session-content').html('')
  const showHTML = (`
    <p>Session ID: ${store.session.id}, Doctor ID: ${store.session.doctor.id}</p>
    <h4>Dr. ${store.session.doctor.first_name} ${store.session.doctor.last_name},  ${store.session.doctor.clinic_affiliation},  Main Phone:  ${store.session.doctor.phone_number}</h4>
    <p>Sub-Specialty - English: ${store.session.doctor.sub_specialty_english}</p>
    <p>Sub-Specialty - Spanish: ${store.session.doctor.sub_specialty_spanish}</p>
    <p>Notes: ${store.session.notes}</p>
    <br>
  `)
  $('#update-one-session-content').append(showHTML)
  $("#oneModal").modal('show')
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
