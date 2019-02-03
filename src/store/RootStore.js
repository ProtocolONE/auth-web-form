import Vue from 'vue';
import Vuex from 'vuex';
import assert from 'simple-assert';
import axios from 'axios';
import qs from 'qs';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';
import Userinfo from './Userinfo';
import { postMessage } from '@/postMessage';
import getFunctionalUrls from '@/getFunctionalUrls';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lastSize: {
      width: 0,
      height: 0,
    },
    clientID: '',
    redirectUri: '',
    token: '',
    isLoading: false,
    isAuthorised: false,
    isRegistered: false,
    isModal: false,
    apiUrl: undefined,
  },
  getters: {
    urls(state) {
      return getFunctionalUrls(state.apiUrl);
    },
  },
  mutations: {
    lastSize(state, value) {
      state.lastSize = value;
    },
    clientID(state, value) {
      state.clientID = value;
    },
    redirectUri(state, value) {
      state.redirectUri = value;
    },
    token(state, value) {
      state.token = value;
      postMessage('TOKEN_RECEIVED', value);
    },
    isLoading(state, value) {
      state.isLoading = value;
    },
    isAuthorised(state, value) {
      state.isAuthorised = value;
    },
    isRegistered(state, value) {
      state.isRegistered = value;
    },
    isModal(state, value) {
      state.isModal = value;
    },
    apiUrl(state, value) {
      state.apiUrl = value;
    },
  },
  actions: {
    initState({ commit }, { formData, options }) {
      const clientID = formData.clientID || window.AUTH_FORM_DATA.client_id;
      assert(clientID, 'clientID is undefined');
      commit('clientID', clientID);
      commit('redirectUri', formData.redirectUri || window.AUTH_FORM_DATA.redirect_uri);
      commit('isModal', options.isModal);
      commit('apiUrl', options.apiUrl || window.AUTH_API_URL);
    },

    async logout({ state, getters }) {
      try {
        const query = {
          client_id: state.clientID,
          redirect_uri: 'http://localhost:8080/?logout=success',
        };
        await axios.get(
          `${getters.urls.apiLogoutUrl}?${qs.stringify(query)}`,
        );
        // eslint-disable-next-line
      } catch (error) { }
    },

    reportResize({ state, commit }, newSize) {
      if (
        state.lastSize.width === newSize.width
        && state.lastSize.height === newSize.height
      ) {
        return;
      }
      postMessage('FORM_RESIZE', newSize);
      commit('lastSize', newSize);
    },

    setAuthorised({ commit }, value) {
      commit('isAuthorised', value);
    },

    setRegistered({ commit }, value) {
      commit('isRegistered', value);
    },

    setToken({ commit }, value) {
      commit('token', value);
    },

    setLoading({ commit }, value) {
      commit('isLoading', value);
    },
  },

  modules: {
    AuthForm,
    RegisterForm,
    Userinfo,
  },
});
