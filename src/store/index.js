import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/user.js';
import { isDevMode } from 'utils';

Vue.use(Vuex);

const debug = isDevMode();

const store = new Vuex.Store({
  modules: {
    user
  },
  strict: debug,
  plugins: []
});

export default store;
