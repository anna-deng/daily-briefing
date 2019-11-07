import axios from 'axios'

const linkedin_url = 'https://cors-anywhere.herokuapp.com/https://www.linkedin.com/oauth/v2/accessToken?client_id=86c265gg6eypd9&client_secret=DHjvZhpIOPXoSKz2&grant_type=authorization_code&redirect_uri=http://localhost:3000/auth/callback&code=';
// headers = {'Content-type': application/x-www-form-urlencoded}

export async function getLinkedInToken(code) {
  return await axios.post(linkedin_url + code, 
      {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      }
  )
  .then(response => {
    return response.data
  })
}