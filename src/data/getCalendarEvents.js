import axios from 'axios'

const gapi_key = process.env.REACT_APP_GOOGLE_API
const calendar_id = 'u.northwestern.edu_s49ei1nj6p02usako7uu4th260@group.calendar.google.com'
const calendar_url = `https://www.googleapis.com/calendar/v3/calendars/${calendar_id}/events?key=${gapi_key}`

export const getEvents = () => {
  axios.get(calendar_url)
  .then(response => {
    console.log(response.data)
    return response.data
  })
}
