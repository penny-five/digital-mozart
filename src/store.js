import Vue from 'vue';
import Vuex from 'vuex';

import { compose } from './composer';
import { sleep } from './utils';

Vue.use(Vuex);

const createState = () => {
  return {
    status: 'WAITING',
    song: null
  };
};

export default new Vuex.Store({
  state: createState(),
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    clearSong() {
      if (this.state.song != null) {
        this.state.song.stop();
      }
      this.state.song = null;
    }
  },
  actions: {
    async reset({ commit }) {
      commit('setStatus', 'WAITING');
      commit('clearSong');
    },
    async generateSong({ commit }, file) {
      commit('setStatus', 'LOADING');

      const [song] = await Promise.all([compose(file), sleep(3000)]);
      this.state.song = song;
      commit('setStatus', 'READY');
      song.play();
    }
  }
});
