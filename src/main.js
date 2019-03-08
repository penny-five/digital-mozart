import Vue from 'vue';

import App from './app.vue';
import store from './store';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
