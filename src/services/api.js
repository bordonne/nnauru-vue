import store from './store.js'
import axios from 'axios' // Library for API calls

// Generic API call
export async function api(url, config = {}) {

    if (config.method === undefined) {
      config.method = "GET"
    }

    // Adding BasicAuth Authorization header
    config.headers = Object.assign({
      Authorization: `Basic ${store.get('credentials')}`,
        'Content-Type': 'application/json'
    }, config.headers)

    let response = null;
    // POST request
    if (config.method === "POST") {
      response = await axios.post(process.env.VUE_APP_API_ROOT + url, config.body, config)
    } else if (config.method === "DELETE"){
      response = await axios.delete(process.env.VUE_APP_API_ROOT + url, config)
    } else { // GET request
      response = await axios.get(process.env.VUE_APP_API_ROOT + url, config)
    }

    if (!response.status == 200){
        throw new Error(response.status)
    }

    return response
}
