import axios from 'axios'

// const profile_url = 'https://cors-anywhere.herokuapp.com/https://api.linkedin.com/v2/me';
const profile_url = 'https://www.linkedin.com/sales/gmail/profile/viewByEmail/thomasli2020@u.northwestern.edu';

// headers = {'Content-type': application/x-www-form-urlencoded}

export async function getLinkedInInfo(token) {
// export async function getLinkedInInfo() {
  return await axios
    .get(profile_url, 
      { withCredentials: true },
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