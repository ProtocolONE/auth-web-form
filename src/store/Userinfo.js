import axios from 'axios';
import functionalUrls from '../functionalUrls';

export default {
  namespaced: true,

  state: {
    userinfo: null,
  },

  mutations: {
    userinfo(state, value) {
      state.userinfo = value;
    },
  },

  actions: {
    async initState({ commit }, { clientID, token }) {
      const userinfoResult = await axios.get(functionalUrls.apiUserinfoUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-CLIENT-ID': clientID,
        },
      });
      commit('userinfo', userinfoResult.data);
    },
  },
};
