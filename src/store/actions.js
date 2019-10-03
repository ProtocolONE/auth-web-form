import axios from 'axios'
import postMessage from '@/utils/post-message'

axios.defaults.withCredentials = true
axios.defaults.xsrfCookieName = '_csrf'
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'

export default {
  /**
   * Handle errors ajax
   */
  handleServerErrors ({ state, commit }, res) {
    if (res && res.status === 400) {
      let data = res.data
      postMessage('error', data)
      commit('updateServerErrors', data)
    }
  },

  /**
   * Handle successful ajax
   */
  handleServerSuccess (_, { name, data }) {
    postMessage(name, data)
    window.location.href = data.url
  },

  /**
   * Auth1 login
   */
  login ({ state, dispatch, getters }, userData) {
    axios
      .post(getters.getLoginURL, getters.getLoginData(userData))
      .then(({ data }) =>
        dispatch('handleServerSuccess', { data, name: 'login' }))
      .catch(({ response }) =>
        dispatch('handleServerErrors', response))
  },

  /**
   * Auth1 registration
   */
  registration ({ state, dispatch, getters }, userData) {
    axios
      .post(getters.getRegistrationURL, getters.getRegistrationData(userData))
      .then(({ data }) =>
        dispatch('handleServerSuccess', { data, name: 'registration' }))
      .catch(({ response }) =>
        dispatch('handleServerErrors', response))
  }
}
