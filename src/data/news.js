import axios from 'axios'

const key = process.env.REACT_APP_NEWS_API_KEY


export default async function getNews(word) {
  var url = 'https://newsapi.org/v2/everything?' +
          `qInTitle=${word}&` +
          'from=2019-11-20&' +
          'sortBy=relevance&' +
          `apiKey=${key}&` +
          'language=en';
  console.log(url)
  return await axios.get(url)
  .then(response => {
    return response.data
  })
}
