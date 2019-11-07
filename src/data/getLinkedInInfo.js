import axios from 'axios'

const profile_url = 'https://cors-anywhere.herokuapp.com/https://api.linkedin.com/v2/me';
// headers = {'Content-type': application/x-www-form-urlencoded}

export async function getLinkedInInfo(token) {
// export async function getLinkedInInfo() {
  return await axios.get(profile_url, 
      {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  )
  .then(response => {
    return response.data
  })
}