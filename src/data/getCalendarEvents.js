import axios from 'axios'

const gapi_key = 'AIzaSyBR-cZfMpmV2MQk-dK7llqHDpGA619BQnY'
const calendar_id = 'u.northwestern.edu_s49ei1nj6p02usako7uu4th260@group.calendar.google.com'
const calendar_url = `https://www.googleapis.com/calendar/v3/calendars/${calendar_id}/events?key=${gapi_key}`

export async function getEvents() {
  return await axios.get(calendar_url)
  .then(response => {
    return response.data
  })
}
