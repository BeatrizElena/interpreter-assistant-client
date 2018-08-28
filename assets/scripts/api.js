const config = require('./config.js')
const store = require('./store.js')

const signUp = function(data) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function(data) {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = function(data) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = function() {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// Doctor API methods
const getAllDoctors = function() {
  return $.ajax({
    url: config.apiUrl + '/doctors',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

//   Session API Methods
const createOneSession = function(data) {
  console.log(data)
    return $.ajax({
      url: config.apiUrl + '/sessions',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: {
        "session": {
          "doctor": data.doctor,
          "notes": data.notes
        }
      }
    })
  }
  
  const getAllSessions = function() {
    return $.ajax({
      url: config.apiUrl + '/sessions',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
  
  const seeOneSession = function (data) {
    return $.ajax({
      url: config.apiUrl + '/sessions/' + data.session.id,
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
  
  const updateOneSession = function (data) {
    return $.ajax({
      url: config.apiUrl + '/sessions/' + data.session.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data
    })
  }
  
  const deleteOneSession = function (data) {
    console.log(data)
    return $.ajax({
      url: config.apiUrl + '/sessions/' + data.session.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  getAllDoctors,
  createOneSession,
  getAllSessions,
  seeOneSession,
  updateOneSession,
  deleteOneSession
}


/*
const createDoctor = function(data) {
  return $.ajax({
    url: config.apiUrl + '/doctors',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      "doctor": {
        "first_name": `${data.first_name}`,
        "last_name": `${data.last_name}`,
        "title": `${data.title}`,
        "phone": `${data.phone}`,
        "disease": `${data.title}`
      }
    }
  })
}



const seeOneDoctor = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/doctors/' + data.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateOneDoctor = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/doctors/' + data.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      "doctor": {
        "first_name": `${data.first_name}`,
        "last_name": `${data.last_name}`,
        "title": `${data.title}`,
        "phone": `${data.phone}`,
        "disease": `${data.title}`
      }
    }
  })
}

const deleteOneDoctor = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/doctors/' + data.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// Clinic API Methods
const createClinic = function(data) {
    return $.ajax({
      url: config.apiUrl + '/clinics',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: {
        "clinic": {
          "abbreviation": `${data.abbreviation}`,
          "name": `${data.name}`,
          "phone": `${data.phone}`,
          "description": `${data.description}`
        }
      }
    })
  }
  
  const getAllClinics = function() {
    return $.ajax({
      url: config.apiUrl + '/clinics',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
  
  const seeOneClinic = function (data) {
    console.log(data)
    return $.ajax({
      url: config.apiUrl + '/clinics/' + data.id,
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
  
  const updateOneClinic = function (data) {
    console.log(data)
    return $.ajax({
      url: config.apiUrl + '/clinics/' + data.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: {
        "clinic": {
            "abbreviation": `${data.abbreviation}`,
            "name": `${data.name}`,
            "phone": `${data.phone}`,
            "description": `${data.description}`
        }
      }
    })
  }
  
  const deleteOneClinic = function (data) {
    console.log(data)
    return $.ajax({
      url: config.apiUrl + '/clinics/' + data.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }


//   Disease API Methods
const createDisease = function(data) {
    return $.ajax({
      url: config.apiUrl + '/diseases',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: {
        "disease": {
          "name_english": `${data.name_english}`,
          "name_translated": `${data.name_translated}`,
          "description_english": `${data.description_english}`,
          "description_translated": `${data.description_translated}`
        }
      }
    })
  }
  
  const getAllDiseases = function() {
    return $.ajax({
      url: config.apiUrl + '/diseases',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
  
  const seeOneDisease = function (data) {
    console.log(data)
    return $.ajax({
      url: config.apiUrl + '/diseases/' + data.id,
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
  
  const updateOneDisease = function (data) {
    console.log(data)
    return $.ajax({
      url: config.apiUrl + '/diseases/' + data.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: {
        "disease": {
            "name_english": `${data.name_english}`,
            "name_translated": `${data.name_translated}`,
            "description_english": `${data.description_english}`,
            "description_translated": `${data.description_translated}`
          }
      }
    })
  }
  
  const deleteOneDisease = function (data) {
    console.log(data)
    return $.ajax({
      url: config.apiUrl + '/diseases/' + data.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }



  const createSession = function(data) {
    return $.ajax({
      url: config.apiUrl + '/sessions',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: {
        "disease": {
          "name_english": `${data.name_english}`,
          "name_translated": `${data.name_translated}`,
          "description_english": `${data.description_english}`,
          "description_translated": `${data.description_translated}`
        }
      }
    })
  }
  createDoctor,
  seeOneDoctor,
  updateOneDoctor,
  deleteOneDoctor,
  createClinic,
  getAllClinics,
  seeOneClinic,
  updateOneClinic,
  deleteOneClinic,
  createDisease,
  getAllDiseases,
  seeOneDisease,
  updateOneDisease,
  deleteOneDisease,

*/