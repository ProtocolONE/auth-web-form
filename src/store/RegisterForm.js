import axios from 'axios';
import functionalUrls from '../functionalUrls';

export default {
  namespaced: true,

  state: {
    token: '',
    registerError: '',
    isRegistered: false,
  },

  mutations: {
    token(state, value) {
      state.token = value;
    },
    registerError(state, value) {
      state.registerError = value;
    },
    isRegistered(state, value) {
      state.isRegistered = value;
    },
  },

  actions: {
    async registerWithEmail({ commit }, { clientID, username, password }) {
      try {
        const { data } = await axios.post(functionalUrls.apiRegisterUrl, {
          client_id: clientID,
          connection: 'password',
          email: username,
          password,
        });
        commit('token', data.access_token);
        commit('isRegistered', true);
        commit('registerError', '');
      } catch (error) {
        commit('registerError', error.response.data.error);
      }
    },
  },
};
