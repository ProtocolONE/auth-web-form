// import axios from '@/axios'
//
// // --- TODO: envs
// const API = 'http://localhost/oauth2'
// const API_LOGIN = `${API}/login`
//
// async function getURL () {
//
// }
//
// get authURL () {
//   let data = pickBy({
//     client_id: this.clientID,
//     state: this.state,
//     redirect_uri: this.urls.redirect,
//     scope: this.scope
//   }, identity)
//   return `${this.urls.api}/login/form?${stringify(data)}`
// }
//
// async function login (data) {
//   try {
//     await axios.post(API_LOGIN, data)
//   }
//   catch (err) {
//     if ('response' in err) {
//       console.error(err.response)
//     }
//   }
// }
//
// async function registration (data) {
//   console.log(data)
// }
//
// export default {
//   methods: {
//     login,
//     registration
//   }
// }
