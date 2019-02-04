import Vue from 'vue';
import Vuex from 'vuex';
import assert from 'simple-assert';
import axios from 'axios';
import qs from 'qs';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';
import Userinfo from './Userinfo';
import SocialAuth from './SocialAuth';
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
    isModal(state, value) {
      state.isModal = value;
    },
    apiUrl(state, value) {
      state.apiUrl = value;
    },
  },
  actions: {
    initState({ commit }, { formData, options }) {
      const { clientID } = formData;
      assert(clientID, 'clientID is undefined at RootStore');
      commit('clientID', clientID);
      commit('redirectUri', formData.redirectUri);
      commit('isModal', options.isModal);
      commit('apiUrl', options.apiUrl);
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

    setToken({ state, commit }, value) {
      if (state.token === value) {
        return;
      }
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
    SocialAuth,
  },
});
