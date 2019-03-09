import Vue from 'vue';
import Vuex from 'vuex';

import { compose } from './composer';
import { sleep } from './utils';

Vue.use(Vuex);

const createState = () => {
  return {
    status: 'WAITING'
  };
};

export default new Vuex.Store({
  state: createState(),
  mutations: {
    setStatus(state, status) {
      state.status = status;
    }
  },
  actions: {
    async reset({ commit }) {
      commit('setStatus', 'WAITING');
    },
    async generateSong({ commit }, file) {
      await compose(file);
      commit('setStatus', 'LOADING');
      await sleep(3000);
      commit('setStatus', 'READY');
    }
  }
});
