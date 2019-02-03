import axios from 'axios';

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
    async initState({ commit, rootState, rootGetters }) {
      try {
        const userinfoResult = await axios.get(rootGetters.urls.apiUserinfoUrl, {
          headers: {
            Authorization: `Bearer ${rootState.token}`,
            'X-CLIENT-ID': rootState.clientID,
          },
        });
        commit('userinfo', userinfoResult.data);
        // eslint-disable-next-line
      } catch (error) {
      }
    },
  },
};
