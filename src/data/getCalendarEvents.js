import axios from 'axios'

const gapi_key = process.env.REACT_APP_GOOGLE_API
const calendar_id = 'u.northwestern.edu_s49ei1nj6p02usako7uu4th260@group.calendar.google.com'
const calendar_url = `https://www.googleapis.com/calendar/v3/calendars/${calendar_id}/events?key=${gapi_key}`
// const calendar_url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList'
const linkedin_url = 'https://www.linkedin.com/oauth/v2/accessToken?client_id=86c265gg6eypd9&client_secret=DHjvZhpIOPXoSKz2&grant_type=authorization_code&redirect_uri=http://localhost:3000/auth/callback&code=';


export async function getEvents() {
  return await axios.get(calendar_url)
  .then(response => {
    return response.data
  })
}

export async function getLinkedInToken(code) {
  return await axios.post(linkedin_url + code)
  .then(response => {
    return response.data
  })
}

// export const getEvents = () => {
//   var data = apiCall()
//   return data
// }

// function apiCall() {
//   return axios.get(calendar_url)
//   .then(response => {
//     Promise.resolve(response.data)
//   })
// }
