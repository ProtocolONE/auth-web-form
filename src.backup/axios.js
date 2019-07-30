import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = '_csrf'
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'

export default axios
