import store from './store.js'
import axios from 'axios' // Library for API calls

// Generic API call
export async function api(url, config = {}) {

    // Adding BasicAuth Authorization header
    config.headers = Object.assign({
      Authorization: `Basic ${store.get('credentials')}`,
        'Content-Type': 'application/json'
    }, config.headers)

    // TODO: handle POST requests
    let response = await axios.get(process.env.VUE_APP_API_ROOT + url, config)

    if (!response.status == 200){
        throw new Error(response.status)
    }

    return response
}
