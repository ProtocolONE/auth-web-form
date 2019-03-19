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
    challenge: '',
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
    challenge(state, value) {
      state.challenge = value;
    },
    csrf(state, value) {
      state.csrf = value;
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
      if (formData.success === undefined) {
        const { challenge } = formData;
        assert(challenge, 'challenge is undefined at RootStore');
      }
      commit('challenge', formData.challenge);
      commit('csrf', formData.csrf);
      commit('isModal', options.isModal);
      commit('apiUrl', options.apiUrl);
    },

    async logout({ getters }) {
      try {
        const query = {
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
