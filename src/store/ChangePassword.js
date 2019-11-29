import axios from 'axios';

export default {
  namespaced: true,

  state: {
    changeError: '',
    isTokenSent: false,
    isTokenVerified: false,
  },

  mutations: {
    changeError(state, value) {
      state.changeError = value;
    },
    isTokenSent(state, value) {
      state.isTokenSent = value;
    },
    isTokenVerified(state, value) {
      state.isTokenVerified = value;
    },
  },

  actions: {
    async changePasswordStart({ commit, rootState, rootGetters }, { email }) {
      try {
        await axios.post(rootGetters.urls.apiChangePasswordStart, {
          client_id: rootState.clientId,
          email,
        });
        commit('changeError', '');
        commit('isTokenSent', true);
      } catch (error) {
        if (error.response) {
          commit('changeError', error.response.data.error_message);
        }
      }
    },
    async changePasswordVerify({ commit, rootState, rootGetters }, {
      token,
      password,
      repeatPassword,
    }) {
      try {
        await axios.post(rootGetters.urls.apiChangePasswordVerify, {
          client_id: rootState.clientId,
          token,
          password,
          password_repeat: repeatPassword,
        });
        commit('changeError', '');
        commit('isTokenVerified', true);
      } catch (error) {
        if (error.response) {
          commit('changeError', error.response.data.error_message);
        }
      }
    },
    clearChangePasswordError({ commit }) {
      commit('changeError', '');
    },
  },
};
